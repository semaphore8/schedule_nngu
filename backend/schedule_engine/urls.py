from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from schedule import views

router = routers.DefaultRouter()
router.register('lessons_distance', views.LessonDistanceViewSet)
router.register('lessons_fulltime', views.LessonFulltimeViewSet)
router.register('groups', views.StudyGroupViewSet)
router.register('weeks', views.WeeksViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    # path('weeks/', views.WeeksView.as_view()),
    # path('api/', include('rest_framework.urls')),
]
