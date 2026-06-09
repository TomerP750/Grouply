type MemberType = "member" | "owner"

export const getMemberTypeTitle = (type: MemberType) => {

    switch (type) {
        case "owner":
            return "Your Project";
        case "member":
            return "You Are Member";
    }

}