interface MainResponse {
    status: boolean,
    error_Code: number,
    error_Description: string,
}

interface MainResponseWithUIToken extends MainResponse {
    IMS_UIToken: string
}

interface ProfileInterface {
    MobileNo: string,
    Email: string
}

interface GetConnectData extends MainResponse {
    user_Role: string,
    user_Pin: number,
    responseData: GetConnectDataResponseData
}
interface RolesUserData {
    roleSeq: number,
    roleCode: string,
    roleName: string,
    relatedPIN: number,
    relatedName: string
}
interface UserDataInConnectData {
    gender: string,
    dob: string,
    fullName: string,
    kycLevel: number,
    kycDescription: string,
    roles: RolesUserData[]
}

interface ProdGroup {
    groupSeq: number,
    groupCode: string,
    groupName: string,
    nbrPolicies: number
}

interface OSPremium {
    currency: string,
    fresh: boolean,
    nbrPremiums: number,
    osAmount: number,
    availablePG: boolean
}

interface OSClaim {
    currency: string,
    fresh: boolean,
    nbrOSClaims: number,
    nbrReadyToSettle: number,
    r2SAmount: number
}

interface PendingRequest{
    nbrRequests: number
}

interface PendingRenewal{
    nbrRenewals: number
}

interface BuyOnline{
    getQuoteURL: string
}

interface ClientSpaceLoginURL{
    getLoginURL: string
}

interface GetConnectDataResponseData {
    userData: UserDataInConnectData[],
    prodGroups: ProdGroup[]
    osPremiums: OSPremium[]
    osClaims: OSClaim[],
    pendingRequests: PendingRequest[]
    pendingRenewals: PendingRenewal[],
    buyOnline: BuyOnline[],
    clientSpace: ClientSpaceLoginURL[]
}


//Login endpoint response
export interface LoginResponse {
    response: MainResponseWithUIToken
}

//Register endpoint response
export interface RegisterResponse {
    response: MainResponse
}

//Change password endpoint response
export interface ChangePasswordResponse {
    response: MainResponse
}

//Renew Token endpoint response
export interface RenewTokenResponse {
    response: MainResponseWithUIToken
}

//Invalid Token endpoint response
export interface InvalidTokenResponse {
    response: MainResponse
}


//Get Profile endpoint response
export interface GetProfileResponse {
    response: ProfileInterface[]
}

//Update Profile endpoint response
export interface UpdateProfileResponse {
    response: MainResponse
}

//Get Connect Data endpoint response
export interface GetConnectDataResponse {
    response : GetConnectData
}

