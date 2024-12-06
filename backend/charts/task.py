from celery import shared_task
from .models import Chart
from .serializers import ChartModelSerializer

def parse_excel(file_path):
    return {
        "title": "hello world",
        "keys": {
            "x": [1, 2, 3, 4, 5],
            "y": [2, 4, 6, 8, 10],
        }
    }

@shared_task
def process_uploaded_file(file_path, user_id):
    print(file_path)
    data = parse_excel(file_path)
    data = {
            'user':user_id,
            'title':data.get('title'),
            'min_x':1,
            'min_y':1,
            'max_x':1,
            'max_y':1,
            'keys':data.get('keys')
        }
    serializer = ChartModelSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        print(serializer.data)


    return {"status": "success", "result": data}