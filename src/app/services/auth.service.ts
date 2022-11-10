import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { filter, map, Observable, of, switchMap } from 'rxjs';
import IUser from '../models/user.model';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<IUser>;
  public isAuthenticated$: Observable<boolean>;
  private redirect = false;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.usersCollection = db.collection('users');
    this.isAuthenticated$ = auth.user.pipe(map((user) => !!user));
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        map((e) => this.route.firstChild),
        switchMap((route) => route?.data ?? of({}))
      )
      .subscribe((data) => {
        this.redirect = data.authOnly ?? false;
      });
  }

  public async createUser(userData: IUser) {
    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email as string,
      userData.password as string
    );

    if (!userCred.user) {
      throw new Error("User can't be found");
    }

    await this.usersCollection.doc(userCred.user?.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      password: userData.password,
    });

    await userCred.user.updateProfile({ displayName: userData.name });
  }

  public async logout($event?: MouseEvent) {
    if ($event) {
      $event.preventDefault;
    }
    await this.auth.signOut();
    if (this.redirect) {
      await this.router.navigateByUrl('/');
    }
  }
}
