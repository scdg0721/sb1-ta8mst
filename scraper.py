import json
from typing import List, Dict, Any

def generate_dummy_data() -> List[Dict[str, Any]]:
    dummy_data = [
        {
            "id": 1,
            "header": "주식 데이터",
            "content": [
                ["종목", "현재가", "전일대비", "등락률"],
                ["삼성전자", "67,000", "▲ 1,000", "+1.52%"],
                ["SK하이닉스", "115,500", "▼ 2,500", "-2.12%"],
                ["NAVER", "213,000", "▲ 3,000", "+1.43%"],
                ["카카오", "89,700", "▼ 1,300", "-1.43%"]
            ]
        },
        {
            "id": 2,
            "header": "환율 정보",
            "content": [
                ["통화", "매매기준율", "전일대비", "등락률"],
                ["USD", "1,320.50", "▲ 5.50", "+0.42%"],
                ["EUR", "1,450.26", "▼ 2.74", "-0.19%"],
                ["JPY", "958.53", "▲ 1.47", "+0.15%"],
                ["CNY", "191.69", "▼ 0.31", "-0.16%"]
            ]
        }
    ]
    return dummy_data

def save_data_to_json(data: List[Dict[str, Any]]) -> None:
    with open('scraped_data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    dummy_data = generate_dummy_data()
    save_data_to_json(dummy_data)
    print("더미 데이터가 scraped_data.json 파일로 저장되었습니다.")