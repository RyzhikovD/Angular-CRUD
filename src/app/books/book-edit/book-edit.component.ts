import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';

import {Observable} from 'rxjs';

import * as bookActions from '../state/book.actions';
import * as fromBook from '../state/bookReducer';
import {Book} from '../book.model';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  bookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromBook.AppState>
  ) {
  }

  ngOnInit() {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      id: null
    });

    const book$: Observable<Book> = this.store.select(
      fromBook.getCurrentBook
    );

    book$.subscribe(currentBook => {
      if (currentBook) {
        this.bookForm.patchValue({
          title: currentBook.title,
          author: currentBook.author,
          description: currentBook.description,
          id: currentBook.id
        });
      }
    });
  }

  updateBook() {
    const updatedBook: Book = {
      title: this.bookForm.get('title').value,
      author: this.bookForm.get('author').value,
      description: this.bookForm.get('description').value,
      id: this.bookForm.get('id').value
    };

    this.store.dispatch(new bookActions.UpdateBook(updatedBook));
  }

}
