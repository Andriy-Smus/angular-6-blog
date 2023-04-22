import { Component, OnInit } from '@angular/core';
import { IBlog } from 'src/app/interfaces/blog.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { BlogService } from 'src/app/service/blog.service';


@Component({
  selector: 'app-angular-blog',
  templateUrl: './angular-blog.component.html',
  styleUrls: ['./angular-blog.component.scss']
})
export class AngularBlogComponent implements OnInit {
  public statusSignIn = false;
  public getBlog!: IBlog[];
  public getUser!: IUser[];
  public username!: string;
  public statusAdmin = false;
  public identefyUser!: string;
  public editID!: number;
  public editUsername!: string;

  public emailSignIn = '';
  public passwordSignIn = '';

  public titleNewPost = '';
  public textNewPost = '';

  public titleEditPost = '';
  public textEditPost = '';

  public usernameSignUp = '';
  public emailSignUp = '';
  public passwordSignUp = '';

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.getPost();
    this.goUser();
  }

  getPost(): void {
    this.getBlog = this.blogService.getPost();
  }

  goUser(): void {
    this.getUser = this.blogService.goUser();
  }

  addClose(): void {
    for(let i = 0; i < this.getUser.length; i++) {
      if(this.emailSignIn == this.getUser[i].email && this.passwordSignIn == this.getUser[i].password) {
        const close = document.getElementById('close') as HTMLButtonElement;
        close.setAttribute('data-bs-dismiss', 'modal');
        return
      }
      else {
        const close = document.getElementById('close') as HTMLButtonElement;
        close.setAttribute('data-bs-dismiss', '');
      }
    }
  }

  signIn(): void {
    for(let i = 0; i < this.getUser.length; i++) {
      if(this.emailSignIn == this.getUser[i].email && this.passwordSignIn == this.getUser[i].password) {
        this.statusSignIn = true;
        this.username = this.getUser[i].username;
        if(this.username == 'admin') {
          this.statusAdmin = true;
        }
        else {
          this.identefyUser = this.username;
        }
        this.emailSignIn = '';
        this.passwordSignIn = '';
        const close = document.getElementById('close') as HTMLButtonElement;
        close.setAttribute('data-bs-dismiss', '');
      }
    }
  }

  signOut(): void {
    this.statusAdmin = false;
    this.statusSignIn = false;
    this.identefyUser = '';
  }

  verifyPost(): void {
    if(this.titleNewPost !== '' && this.textNewPost !== '') {
      const verify = document.getElementById('verify') as HTMLButtonElement;
      verify.setAttribute('data-bs-dismiss', 'modal');
    }
    else {
      const verify = document.getElementById('verify') as HTMLButtonElement;
      verify.setAttribute('data-bs-dismiss', '');
    }
  }
  
  addNewPost(): void {
    if(this.titleNewPost !== '' && this.textNewPost !== '') {
      const newPost = {
        id: 1,
        postedBy: this.username,
        topic: this.titleNewPost,
        date: new Date(),
        message: this.textNewPost,
      }
      if(this.getBlog.length > 0) {
        const id = this.getBlog.slice(-1)[0].id;
        newPost.id = id + 1;
      }
      this.blogService.addNewPost(newPost);
      this.titleNewPost = '';
      this.textNewPost = '';
      const verify = document.getElementById('verify') as HTMLButtonElement;
      verify.setAttribute('data-bs-dismiss', '');
    }
  }

  deletePost(post: IBlog): void {
    this.blogService.deletePost(post.id);
  }

  editPost(post: IBlog): void {
    this.titleEditPost = post.topic;
    this.textEditPost = post.message;
    this.editID = post.id;
    this.editUsername = post.postedBy;
  }

  savePost(): void {
    if(this.titleEditPost !== '' && this.textEditPost !== '') {
      const updatePost = {
        id: this.editID,
        postedBy: this.editUsername,
        topic: this.titleEditPost,
        date: new Date(),
        message: this.textEditPost,
      }
      this.blogService.updatePost(updatePost, this.editID);
      this.titleEditPost = '';
      this.textEditPost = '';
      const edit = document.getElementById('editClose') as HTMLButtonElement;
      edit.setAttribute('data-bs-dismiss', '');
    }
  }

  signUp(): void {
    let usernameRegExp = /^[A-Za-z]{2,20}$/;
    let emailRegExp1 = /^[A-Za-z1-9.-_]{1,}@{1}[a-z]{1,}\.net$/;
    let emailRegExp2 = /^[A-Za-z1-9.-_]{1,}@{1}[a-z]{1,}\.com$/;
    let emailRegExp4 = /^[A-Za-z1-9.-_]{1,}@{1}[a-z]{1,}\.mail$/;
    let emailRegExp3 = /^[A-Za-z1-9.-_]{1,}@{1}[a-z]{1,}\.ua$/;
    let passwordRegExp = /^\w{4,15}$/;
    if(usernameRegExp.test(this.usernameSignUp) && passwordRegExp.test(this.passwordSignUp)) {
      if(emailRegExp1.test(this.emailSignUp) || emailRegExp2.test(this.emailSignUp) || emailRegExp3.test(this.emailSignUp) || emailRegExp4.test(this.emailSignUp)) {
        const isUsernameUnique = this.getUser.find(u => u.username === this.usernameSignUp);
        const isEmailUnique = this.getUser.find(u => u.email === this.emailSignUp);
        if (!isUsernameUnique && !isEmailUnique) {
          const newUser = {
            id: this.editID,
            username: this.usernameSignUp,
            email: this.emailSignUp,
            password: this.passwordSignUp,
          }
          if(this.getUser.length > 0) {
            const id = this.getUser.slice(-1)[0].id;
            newUser.id = id + 1;
          }
          this.identefyUser = newUser.username;
          this.blogService.signUp(newUser);
          this.statusSignIn = true;
          this.username = newUser.username;
          this.usernameSignUp = '';
          this.emailSignUp = '';
          this.passwordSignUp = '';
          const signUp = document.getElementById('signUp') as HTMLButtonElement;
          signUp.setAttribute('data-bs-dismiss', '');
        }
      }
    }
  }

  verifyUser(): void {
    let usernameRegExp = /^[A-Za-z]{2,20}$/;
    let emailRegExp1 = /^[A-Za-z1-9.-_]{1,}@{1}[a-z]{1,}\.net$/;
    let emailRegExp2 = /^[A-Za-z1-9.-_]{1,}@{1}[a-z]{1,}\.com$/;
    let emailRegExp4 = /^[A-Za-z1-9.-_]{1,}@{1}[a-z]{1,}\.mail$/;
    let emailRegExp3 = /^[A-Za-z1-9.-_]{1,}@{1}[a-z]{1,}\.ua$/;
    let passwordRegExp = /^\w{4,15}$/;
    if(usernameRegExp.test(this.usernameSignUp) && passwordRegExp.test(this.passwordSignUp)) {
      if(emailRegExp1.test(this.emailSignUp) || emailRegExp2.test(this.emailSignUp) || emailRegExp3.test(this.emailSignUp) || emailRegExp4.test(this.emailSignUp)) {
        const isUsernameUnique = this.getUser.find(u => u.username === this.usernameSignUp);
        const isEmailUnique = this.getUser.find(u => u.email === this.emailSignUp);
        if (!isUsernameUnique && !isEmailUnique) {
          const signUp = document.getElementById('signUp') as HTMLButtonElement;
          signUp.setAttribute('data-bs-dismiss', 'modal');
        }
        else {
          const signUp = document.getElementById('signUp') as HTMLButtonElement;
          signUp.setAttribute('data-bs-dismiss', '');
        }
      }
      else {
        const signUp = document.getElementById('signUp') as HTMLButtonElement;
        signUp.setAttribute('data-bs-dismiss', '');
      }
    }
    else {
      const signUp = document.getElementById('signUp') as HTMLButtonElement;
      signUp.setAttribute('data-bs-dismiss', '');
    }
  }
}
