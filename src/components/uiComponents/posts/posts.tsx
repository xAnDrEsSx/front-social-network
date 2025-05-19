import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { AppLayoutProps } from "../../../types/iAppLayout";
import { useEffect, useState } from 'react';
import { usePostsStore } from '../../../infrastructure/store/sPosts';
import { PostStore } from '../../../types/store/iStorePosts';
import { useSesionStore } from '../../../infrastructure/store/sSession';
import { Button, Textarea } from '@headlessui/react';

function getInitials(name) {
  const words = name?.split(' ');
  if (words)
    if (words.length >= 2) {
      return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    } else if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
  return '';
}

const Posts = ({ children }: AppLayoutProps) => {

  const token = useSesionStore(state => state.token);
  const id = useSesionStore(state => state.id);
  const getPostsData = usePostsStore((state: PostStore) => state.getPosts);
  const setLike = usePostsStore((state: PostStore) => state.setLike);
  const data = usePostsStore(state => state.data)
  const addPost = usePostsStore((state: PostStore) => state.addPost);
  const [newPostMessage, setNewPostMessage] = useState('');

  useEffect(() => {
    //Consumo del servicio
    getPostsData(token);

    console.log(data)
  }, [id]);

  const handleLike = (postId: string) => {
    setLike(token, id, postId);
    setTimeout(() => {
      getPostsData(token);
    }, 100);
  }

  const handleAddPost = () => {
    if (newPostMessage.trim()) {
      addPost(token, id, newPostMessage);
      setNewPostMessage(''); // Clear the input after posting
      setTimeout(() => {
        getPostsData(token);
      }, 100);
    }
  };

  return (

    < div className="space-y-4 w-full" >
      {children}

      <div className="bg-white rounded-md shadow-sm p-4 dark:bg-gray-900">
        <Textarea
          placeholder="¿Qué estas pensando?"
          value={newPostMessage}
          onChange={(e) => setNewPostMessage(e.target.value)}
          className="w-full outline-solid outline-1 outline-gray-200 focus:outline-gray-300 dark:outline-gray-800 dark:focus:outline-gray-600 p-2"
        />
        <div className="mt-2 flex justify-end">
          <button
            onClick={handleAddPost}
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-semibold"
            disabled={!newPostMessage.trim()}
          >
            Publicar
          </button>
        </div>
      </div>
      {
        data.map((post) => (
          <div key={post?.id + Math.random().toString()} className="bg-white dark:bg-gray-900 rounded-md shadow-sm p-4">
            <div className="flex items-center space-x-2">
              <div className="rounded-full w-10 h-10 bg-gray-200 dark:bg-gray-800 flex items-center justify-center font-semibold text-gray-700 dark:text-gray-200">
                {getInitials(post?.user?.firstName)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-200 text-justify">{`${post.user?.firstName} ${post.user?.lastName}`}</h3>
                <p className="text-xs text-gray-600 text-justify dark:text-blue-400">{post?.publishedAt}</p>
              </div>
            </div>
            <p className="mt-2 text-gray-800 text-justify dark:text-gray-200">{post?.message}</p>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <span>
                  {post?.likes.length > 0 ? (
                    <HeartSolidIcon className="h-5 w-5 text-red-500" />
                  ) : (
                    <HeartIcon className="h-5 w-5 text-gray-500" />
                  )}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{post?.likes.length}</span>
              </div>
              <button
                className={`cursor-pointer flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-semibold ${post?.likes.some(x => x.userId == id) ? 'bg-blue-500 text-white dark:bg-blue-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-600'
                  }`}
                onClick={() => handleLike(post?.id)}
              >
                {post?.likes.some(x => x.userId == id) ? <HeartSolidIcon className="h-4 w-4" /> : <HeartIcon className="h-4 w-4" />}
                <span>Me gusta</span>
              </button>
            </div>
          </div>
        ))
      }
    </div >
  );
}

export default Posts;
