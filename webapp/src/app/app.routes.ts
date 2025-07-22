// import { Routes } from '@angular/router';

// export const routes: Routes = [];
import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { AddStudentComponent } from './students/add-student/add-student.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { InstructorListComponent } from './instructors/instructor-list/instructor-list.component';
import { AddInstructorComponent } from './instructors/add-instructor/add-instructor.component';
import { authGuard } from './shared/services/auth.guard';


export const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
    { path: '', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [authGuard],
    children: [
    //   { path: '', redirectTo: 'students', pathMatch: 'full' },
      { path: 'students', component: StudentListComponent },
      { path: 'add-student', component: AddStudentComponent },
      { path: 'courses', component: CourseListComponent },
      { path: 'add-course', component: AddCourseComponent },
      { path: 'instructors', component: InstructorListComponent },
      { path: 'add-instructor', component: AddInstructorComponent },
      { path: '', redirectTo: 'students', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/login' }
];