import { IsNotEmpty, MinLength, IsEmail, IsEnum } from "class-validator";

enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    UNDEFİNED = 'undefined',
}

export class UserDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

    @IsNotEmpty()
    @IsEnum(Gender, {
        message: 'gender must be either male, female, undefined',
    })
    readonly gender: Gender;
}