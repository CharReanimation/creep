# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
import httpx

app = FastAPI(title="Ecom API Demo", version="0.1.0")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# 允许前端本地联调（后续把 * 换成你的前端域名）
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- 数据模型 ----------
class Money(BaseModel):
    value: float
    currency: str

class EcomItem(BaseModel):
    site: str
    title: str
    url: str
    image: str
    price: Money
    stock: str  # in_stock | oos | preorder

class SearchReq(BaseModel):
    q: str
    region: Optional[str] = None
    sites: Optional[List[str]] = None
    forceRefresh: Optional[bool] = False

# ---------- test ----------
@app.get("/health")
def health():
    return {"ok": True, "version": "0.1.0"}

# ---------- 最小站点适配器（示例数据源） ----------
async def search_fakestore(q: str) -> List[Dict[str, Any]]:
    """
    用公开的 dummyjson.com 搜索接口返回商品列表，映射到统一结构。
    之后你可以把这里替换成真实站点的 HTML 解析逻辑。
    """
    url = "https://dummyjson.com/products/search"
    params = {"q": q}
    async with httpx.AsyncClient(timeout=10) as client:
        r = await client.get(url, params=params)
        r.raise_for_status()
        data = r.json()

    items: List[Dict[str, Any]] = []
    for p in data.get("products", []):
        items.append({
            "site": "fakestore",
            "title": p.get("title", ""),
            "url": f"https://dummyjson.com/products/{p.get('id')}",  # 演示用链接
            "image": p.get("thumbnail", ""),
            "price": {"value": float(p.get("price") or 0), "currency": "USD"},
            "stock": "in_stock",  # 该源无库存字段，先写死
        })
    return items

# ---------- 搜索接口 ----------
@app.post("/ecom/search")
async def ecom_search(req: SearchReq):
    items = await search_fakestore(req.q)
    return {
        "query": req.q,
        "region": req.region,
        "fetched_at": datetime.now(timezone.utc).isoformat(),
        "from_cache": False,
        "items": items,
        "site_status": {"fakestore": "ok"},
    }
