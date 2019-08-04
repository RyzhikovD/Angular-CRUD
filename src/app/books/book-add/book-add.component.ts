import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as bookActions from '../state/book.actions';
import * as fromBook from '../state/bookReducer';
import {Book} from '../book.model';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
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
    });
  }

  createBook() {
    const newBook: Book = {
      title: this.bookForm.get('title').value,
      author: this.bookForm.get('author').value,
      description: this.bookForm.get('description').value
    };

    this.store.dispatch(new bookActions.CreateBook(newBook));

    this.bookForm.reset();
  }
}
