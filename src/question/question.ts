import { Campuses, Courses, Semesters, Specials } from '../role/role';

export class Option {
    constructor(readonly label: string) {}
}

export class Question {
    constructor(readonly text: string, readonly options: Option[]) {}
}

export const specialQuestion = new Question(
    "Hello, bienvenue sur le serveur d'INTECH ! Peux-tu me dire ce que tu es ?",
    Specials.map((special) => new Option(special)),
);

export const campusQuestion = new Question(
    'Ok. Dans quel campus ?',
    Campuses.map((campus) => new Option(campus)),
);

export const semesterQuestion = new Question(
    'Super. En quel semestre es-tu ?',
    Semesters.map((semester) => new Option(semester)),
);

export const courseQuestion = new Question(
    'Dernière question : en quelle filière es-tu ?',
    Courses.map((course) => new Option(course)),
);
