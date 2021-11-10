import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostList from '../components/PostList';
import { getPosts } from '../modules/posts';

function PostListContainer() {
  const { data, loading, error } = useSelector(state => state.posts.posts);
  const dispatch = useDispatch();

  // 컴포넌트 마운트 후 포스트 목록 요청
  // 뒤로 가기 시에도 로딩중이 보여 사용자에게 좋지 못한 경험을 보여주게 된다.
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  //포스트 목록이 이미 있는데 재로딩하는 이슈 수정 첫번째 방법
  // useEffect(() => {
  //   if (data) return;
  //   dispatch(getPosts());
  // }, [data, dispatch]);

  if (loading && !data) return <div>로딩중...</div>; // 로딩중이면서, 데이터가 없을 때에만 로딩중... 표시
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;
  
  return <PostList posts={data} />;
}

export default PostListContainer;