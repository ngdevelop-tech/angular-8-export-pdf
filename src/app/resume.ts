export class Resume {
    profilePic: string;
    name: string;
    address: string;
    contactNo: number;
    email: string;
    socialProfile: string;
    experiences: Experience[] = [];
    educations: Education[] = [];
    otherDetails: string;
    skills: Skill[] = [];

    constructor() {
        this.experiences.push(new Experience());
        this.educations.push(new Education());
        this.skills.push(new Skill());
    }
}

export class Experience {
    employer: string;
    jobTitle: string;
    jobDescription: string;
    startDate: string;
    experience: number;
}

export class Education {
    degree: string;
    college: string;
    passingYear: string;
    percentage: number;
}

export class Skill {
    value: string;
}
