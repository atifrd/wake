export class RegisterUser {
    firstName:string;
    lastName:string;
    region:string;
    location:string;
    farmAddress:string;
    farmName:string;
    email:string;
    password:string;
    managerName:string;
    ownerName:string;
    timezone:string;
}

export class AuthenticateUser {
    email: string;
    password: string;
}

export class InviteUser {
    firstName:string;
    lastName:string;
    email:string;
    role: string;
}