import type { Blog } from '../hooks';

import { Appbar } from './Appbar';
import { Avatar } from './BlogCard';

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid w-full max-w-screen-xl grid-cols-12 px-10 pt-12 pt-20 gap-10">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="pt-2 text-slate-500">Post on 2nd December 2023</div>
            <div className="pt-4">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div className="text-lg text-slate-600">Author</div>
            <div className="flex w-full">
              <div className="flex flex-col justify-center pr-4">
                <Avatar size="big" name={blog.author?.name || 'Anonymous'} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author?.name || 'Anonymous'}
                </div>
                <div className="pt-2 text-slate-500">
                  Random catch phrase about the author's ability to grab the
                  user's attention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
