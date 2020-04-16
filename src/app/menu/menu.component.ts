import { Component, OnInit } from '@angular/core';
import { TypeTask } from '../modules/iface.module';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  //
  // flagTasks = {
  //   f1: true,    // Таблица умножения
  //   f2: false,    // Целые числа - сложение и вычитание (группа целых чисел)
  //   f3: false,    // Целые числа - умножение и деление (кольцо целых чисел)
  //   f4: false,    // Дроби 1 - сложение и вычитание 5 класс
  //   f5: false,    // Дроби 2 - умножение и деление 5 класс
  //   f6: false,    // Дроби 3 - все операции 6 класс (поле рациональных чисел)
  //   f7: false     // Квадратные уравнения
  // };

  currentTask = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
