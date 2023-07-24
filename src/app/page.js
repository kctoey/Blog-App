import Image from "next/image";
import BlogCard from "./components/blogCard/BlogCard";
import { blogs } from "./lib/data";
import classes from "./page.module.css";

export default function Home() {
  return (
    <div>
      <div className={classes.container}>
        <h2>Blog website</h2>
        <div className={classes.wrapper}>
          {blogs.map((blog) => (
            <BlogCard key={blog.title} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
}
