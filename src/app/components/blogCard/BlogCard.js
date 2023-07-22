import Image from "next/image";
import Link from "next/link";
import React from "react";
import classes from "./blogcard.module.css";
import { AiFillLike } from "react-icons/ai";

import { AiOutlineLike } from "react-icons/ai";

const BlogCard = ({ blog: { title, desc, img } }) => {
  const isLike = true;
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Link className={classes.imgContainer} href="/">
          <Image src={img} width="350" height="350" />
        </Link>
        <div className={classes.blogData}>
          <div className={classes.left}>
            <h3>{title}</h3>
            <p>{desc}</p>
            <span>
              Created By:<span>1th of January</span>
            </span>
          </div>
          <div className={classes.right}>
            {12}
            {isLike ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
