import ProfileForm from "../components/forms/ProfileForm";

function handleSubmit(values: any) {
    // Your form submission logic here
    // setFormSubmitted(true);
    console.log(values);
}


function RegistrationPage() {


    return (
        <>
            <h1>Create new user</h1>
            <ProfileForm onSubmit={handleSubmit} headerText={"Profile form"}/>
        </>
    );
}
export default RegistrationPage;