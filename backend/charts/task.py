from celery import shared_task
import os, json
def parse_excel(file_path):
    return {
        "x": [1, 2, 3, 4, 5],
        "y": [2, 4, 6, 8, 10],
    }

@shared_task
def process_uploaded_file(file_path, user_id):
    """
    stub to handle file upload
    """
    data = parse_excel(file_path)

    result_path = os.path.join(os.path.dirname(file_path), f"result_{user_id}.json")
    with open(result_path, "w") as result_file:
        json.dump(data, result_file)

    return {"status": "success", "result_path": result_path}