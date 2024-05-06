from .models import Room, Post
from django.db.models import Count



def load_rooms(params={}):
    q = Room.objects.filter(status=True)

    post_id = params.get('post_id')
    if post_id:
        q = q.filter(post_id=post_id)

    return q


def count_rooms_by_post():
    return Post.objects.annotate(count=Count('rooms')).values("id", "count").order_by('-count')
