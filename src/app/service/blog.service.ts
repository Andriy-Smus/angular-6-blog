import { Injectable } from '@angular/core';
import { IBlog } from 'src/app/interfaces/blog.interface';
import { IUser } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogs: Array<IBlog> = [
    {
      id: 1,
      postedBy: 'admin',
      topic: 'First post',
      date: new Date(),
      message: 'Sign up to createyour account and start to use Angular Blog',
    }
  ] 

  constructor() { }

  getPost(): Array<IBlog> {
    return this.blogs;
  }

  private users: Array<IUser> = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@gmail.com',
      password: 'admin',
    }
  ] 

  goUser(): Array<IUser> {
    return this.users
  }

  // getPost(): Array<IBlog> {
  //   return this.blogs;
  // }

  addNewPost(post: IBlog): void {
    this.blogs.push(post);
  }

  deletePost(id: number): void {
    const index = this.blogs.findIndex(post => post.id === id);
    this.blogs.splice(index, 1);
  }

  updatePost(post: IBlog, id: number): void {
    const index = this.blogs.findIndex(post => post.id === id);
    this.blogs.splice(index, 1, post);
  }

  signUp(newUser: IUser): void {
    this.users.push(newUser);
  }
}
