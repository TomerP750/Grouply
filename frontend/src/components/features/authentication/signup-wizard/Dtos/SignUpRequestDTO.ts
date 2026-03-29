

type AccountDTO = {
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

    accountDetails: AccountDTO

    // Profile related

    constructor(accountDetails: AccountDTO) {
        this.accountDetails = accountDetails
    }
    
}