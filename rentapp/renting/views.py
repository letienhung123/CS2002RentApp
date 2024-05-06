from rest_framework import viewsets, generics, status, parsers, permissions
from rest_framework.response import Response

from .models import Room, Post, User, Comment
from renting import serializers, paginators, perms
from rest_framework.decorators import action


class RoomViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Room.objects.filter(status=True).all()
    serializer_class = serializers.RoomSerializer


class PostViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = serializers.PostSerializer
    # pagination_class = paginators.PostPaginator
    permission_classes = [permissions.AllowAny]

    # def get_permissions(self):
    #     if self.action in ['add_comment']:
    #         return [permissions.IsAuthenticated()]
    #
    #     return self.permission_classes

    @action(methods=['post'], url_path='add_comment', detail=True)
    def add_comment(self, request, pk):
        c = Comment.objects.create(user=request.user, post=self.get_object(), content=request.data.get('content'))
        return Response(serializers.CommentSerializer(c).data, status=status.HTTP_201_CREATED)

    # @action(methods=['get'], detail=True, url_path='get_rooms')  # danh sách các Rooms của Post
    # def get_rooms(self, request, pk):
    #     rooms = self.get_object().rooms.filter(status=True).all()
    #
    #     return Response(serializers.RoomSerializer(rooms, many=True, context={'request': request}).data,
    #                     status=status.HTTP_200_OK)
    #
    # @action(methods=['get'], detail=True, url_path='get_comments')  # danh sách các cmt của post
    # def get_comments(self, request, pk):
    #     comments = self.get_object().comments.all()
    #
    #     return Response(serializers.CommentSerializer(comments, many=True, context={'request': request}).data,
    #                     status=status.HTTP_200_OK)


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True).all()
    serializer_class = serializers.UserSerializer
    parser_classes = [parsers.MultiPartParser]

    def get_permissions(self):
        if self.action.__eq__('current_user'):
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(methods=['get'], detail=False, url_path='current-user')
    def current_user(self, request):
        request.user
        return Response(serializers.UserSerializer(request.user).data)

    @action(methods=['get'], detail=True, url_path='room_user')  # danh sách các Rooms của User
    def get_room_user(self, request, pk):
        room_user = self.get_object().room_user.all()

        return Response(serializers.RoomSerializer(room_user, many=True, context={'request': request}).data,
                        status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True, url_path='post_user')  # danh sách các Posts của User
    def get_post_user(self, request, pk):
        post_user = self.get_object().posts.all()

        return Response(serializers.RoomSerializer(post_user, many=True, context={'request': request}).data,
                        status=status.HTTP_200_OK)


class CommentViewSet(viewsets.ViewSet, generics.DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = serializers.CommentSerializer
    permission_classes = [perms.OwnerAuthenticated]
