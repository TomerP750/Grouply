

type Account = {
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
    confirmPassword: string
}

type Profile = {

}

export class SignUpRequestDTO {

    account: Account

    // Profile related

    constructor(account: Account) {
        this.account = account
    }
    
}