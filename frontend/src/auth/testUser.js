import UserContext from "./UserContext";

const testUser = {
    username: "testuser",
    firstName: "test",
    lastName: "test",
    email: "t@t.com",
    isAdmin: "false",
    applications: [],
}



const TestUserProvider = ({children, currentUser=testUser, user=testUser, hasAppliedForJob = () => false, applyForJob = () => false}) => (
    <UserContext.Provider value={{currentUser, user, hasAppliedForJob, applyForJob}}>{children}</UserContext.Provider>
);

export default TestUserProvider;