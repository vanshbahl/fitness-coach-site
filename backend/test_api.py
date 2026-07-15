import requests

BASE_URL = "http://127.0.0.1:8000/api/v1/bookings"

payload = {
    "name": "Virat Kohli",
    "age": 35,
    "gender": "male",
    "city": "Delhi",
    "country": "IN",
    "country_code": "+91",
    "national_number": "9876543210",
    "instagram_handle": "@virat.kohli",
    "height_cm": 175,
    "weight_kg": 74.5,
    "fitness_level": "intermediate",
    "previous_experience": True,
    "injuries": "None",
    "current_routine": "Gym 4x a week",
    "goals": ["Build Strength", "Learn Calisthenics"],
    "equipment_available": ["Pull-up Bar", "Gym Access"],
    "preferred_duration": "3_months",
    "fee_acknowledgement": True,
    "preferred_days": ["Monday", "Wednesday", "Friday"],
    "preferred_times": ["Morning"],
    "timezone": "Asia/Kolkata"
}

# CREATE
print("Testing CREATE...")
res = requests.post(BASE_URL, json=payload)
print(res.status_code, res.json())
assert res.status_code == 201
booking_id = res.json()["data"]["id"]

# GET
print("\nTesting GET...")
res = requests.get(f"{BASE_URL}/{booking_id}")
print(res.status_code, res.json())
assert res.status_code == 200

# UPDATE
print("\nTesting UPDATE...")
res = requests.patch(f"{BASE_URL}/{booking_id}", json={"coach_notes": "VIP Client"})
print(res.status_code, res.json())
assert res.status_code == 200
assert res.json()["data"]["coach_notes"] == "VIP Client"

# LIST
print("\nTesting LIST...")
res = requests.get(BASE_URL)
print(res.status_code, res.json())
assert res.status_code == 200
assert len(res.json()["data"]) >= 1

# DELETE
print("\nTesting DELETE...")
res = requests.delete(f"{BASE_URL}/{booking_id}")
print(res.status_code, res.json())
assert res.status_code == 200

print("\nALL TESTS PASSED!")
