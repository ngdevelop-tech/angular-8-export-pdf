import { Component } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Resume, Experience, Education } from './resume';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'resume-builder';

  resume = new Resume();

  degrees = ['B.E.', 'M.E.', 'B.Com', 'M.Com'];

  constructor() {
    this.resume = JSON.parse(sessionStorage.getItem('resume')) || new Resume();
    if (!this.resume.experiences || this.resume.experiences.length === 0) {
      this.resume.experiences = [];
      this.resume.experiences.push(new Experience());
    }
    if (!this.resume.educations || this.resume.educations.length === 0) {
      this.resume.educations = [];
      this.resume.educations.push(new Education());
    }
  }

  addExperience() {
    this.resume.experiences.push(new Experience());
  }

  addEducation() {
    this.resume.educations.push(new Education());
  }

  generatePdf() {

    sessionStorage.setItem('resume', JSON.stringify(this.resume));
    const documentDefinition = {
      content: [
        {
          columns: [
            [{
              text: this.resume.name,
              style: 'name'
            },
            {
              text: this.resume.address
            }
            ],
            [
              {
                text: 'Email : ' + this.resume.email,
                alignment: 'right'
              },
              {
                text: 'Contant No : ' + this.resume.contactNo,
                alignment: 'right'
              },
              {
                text: 'GitHub: ' + this.resume.socialProfile,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'Experience',
          style: 'header'
        },
        this.getExperienceObject(this.resume.experiences),

        {
          text: 'Education',
          style: 'header'
        },
        this.getEducationObject(this.resume.educations),
        {
          text: 'Other Details',
          style: 'header'
        },
        {
          text : this.resume.otherDetails
        },
        {
          text: 'Signature',
          style: 'sign'
        },
        {
          text : `(${this.resume.name})`,
          alignment: 'right',
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline'
        },
        name: {
          fontSize: 16,
          bold: true
        },
        jobTitle: {
          fontSize: 14,
          bold: true,
          italics: true
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true
        },
        tableHeader: {
          bold: true,
        }
      },
      defaultStyle: {
        columnGap: 20
      }
    };

    console.log(documentDefinition);
    pdfMake.createPdf(documentDefinition).open();
  }

  getExperienceObject(experiences: Experience[]) {

    const exs = [];

    experiences.forEach(experience => {
      exs.push(
        [{
          columns: [
            [{
              text: experience.jobTitle,
              style: 'jobTitle'
            },
            {
              text: experience.employer,
            },
            {
              text: experience.jobDescription,
            }],
            {
              text: 'Experience : ' + experience.experience + ' Months',
              alignment: 'right'
            }
          ]
        }]
      );
    });

    return {
      table: {
        widths: ['*'],
        body: [
          ...exs
        ]
      }
    };
  }

  getEducationObject(educations: Education[]) {
    return {
      table: {
        widths: ['*', '*', '*', '*'],
        body: [
          [{
            text: 'Degree',
            style: 'tableHeader'
          },
          {
            text: 'College',
            style: 'tableHeader'
          },
          {
            text: 'Passing Year',
            style: 'tableHeader'
          },
          {
            text: 'Result',
            style: 'tableHeader'
          },
          ],
          ...educations.map(ed => {
            return [ed.degree, ed.college, ed.passingYear, ed.percentage];
          })
        ]
      }
    };
  }
}
