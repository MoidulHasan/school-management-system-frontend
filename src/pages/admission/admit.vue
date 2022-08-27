<template>

    <Toast />

    <div>
        <div class="mb-2">
            <Breadcrumb :home="home" :model="items" />
        </div>
        <div class="w-full">
            <div class="card">
                <form @submit="onSubmit">
                    <h1 class="text-center">Admit Student</h1>

                    <div class="col-12">
                        <h5>Personal Information</h5>
                        <div class="p-fluid formgrid grid">
                            <div class="field col-12 md:col-6">
                                <label for="firstname">First Name</label>
                                <InputText id="firstname" v-model="firstname" />
                                <p class="text-red-600" v-if="errors.firstname">
                                    {{ errors.firstname }}
                                </p>
                            </div>

                            <div class="field col-12 md:col-6">
                                <label for="lastname">Last Name</label>
                                <InputText id="lastname" type="text" v-model="lastname" />
                                <p class="text-red-600" v-if="errors.lastname">
                                    {{ errors.lastname }}
                                </p>
                            </div>


                            <div class="field col-12 md:col-4">
                                <label for="birthday">Birth Date</label>
                                <Calendar id="birthday" v-model="birthday" dateFormat="dd-mm-yy" />
                                <p class="text-red-600" v-if="errors.birthday">
                                    {{ errors.birthday }}
                                </p>
                            </div>

                            <div class="field col-12 md:col-4">
                                <label for="gender">Gender</label>
                                <Dropdown v-model="gender" :options="genders" optionLabel="name" option-value="name"
                                    placeholder="Select a Gender" />
                                <p class="text-red-600" v-if="errors.gender">
                                    {{ errors.gender }}
                                </p>
                            </div>

                            <div class="field col-12 md:col-4">
                                <label for="bloodGroup">Blood Group</label>
                                <Dropdown v-model="bloodGroup" :options="bloodGroups" optionLabel="name"
                                    option-value="name" placeholder="Select Blood Group" />
                                <p class="text-red-600" v-if="errors.bloodGroup">
                                    {{ errors.bloodGroup }}
                                </p>
                            </div>


                            <div class="field col-12 md:col-6">
                                <label for="fathersName">Father's Name</label>
                                <InputText id="fathersName" v-model="fathersName" />
                                <p class="text-red-600" v-if="errors.fathersName">
                                    {{ errors.fathersName }}
                                </p>
                            </div>

                            <div class="field col-12 md:col-6">
                                <label for="mothersName">Mother's Name</label>
                                <InputText id="mothersName" type="text" v-model="mothersName" />
                                <p class="text-red-600" v-if="errors.mothersName">
                                    {{ errors.mothersName }}
                                </p>
                            </div>
                        </div>
                    </div>


                    <div class="col-12 mt-3">
                        <h5>Contact Information</h5>
                        <div class="p-fluid formgrid grid">

                            <div class="field col-12 md:col-6">
                                <label for="guardianEmail">Guardian's Email Address</label>
                                <InputText id="guardianEmail" type="text" v-model="guardianEmail" />
                                <p class="text-red-600" v-if="errors.guardianEmail">
                                    {{ errors.guardianEmail }}
                                </p>
                            </div>

                            <div class="field col-12 md:col-6">
                                <label for="guardianPhone">Guardian's Phone Number</label>
                                <InputText id="guardianPhone" type="text" v-model="guardianPhone" />
                                <p class="text-red-600" v-if="errors.guardianPhone">
                                    {{ errors.guardianPhone }}
                                </p>
                            </div>

                            <div class="field col-12">
                                <label for="studentAddress">Street Address</label>
                                <Textarea id="studentAddress" rows="2" type="text" v-model="studentAddress" />
                                <p class="text-red-600" v-if="errors.studentAddress">
                                    {{ errors.studentAddress }}
                                </p>
                            </div>

                            <div class="field col-12 md:col-4">
                                <label for="division">Division</label>
                                <Dropdown id="division" v-model="division" :options="divisions" optionLabel="name"
                                    option-value="name" @change="fetchDistricts" placeholder="Select Division">
                                </Dropdown>
                                <p class="text-red-600" v-if="errors.division">
                                    {{ errors.division }}
                                </p>
                            </div>

                            <div class="field col-12 md:col-4">
                                <label for="districts">Districts</label>
                                <Dropdown id="districts" v-model="district" :options="districts" optionLabel="name"
                                    option-value="name" placeholder="Select Districts"></Dropdown>
                                <p class="text-red-600" v-if="errors.district">
                                    {{ errors.district }}
                                </p>
                            </div>

                            <div class="field col-12 md:col-4">
                                <label for="zipCode">Zip Code</label>
                                <InputText id="zipCode" type="text" v-model="zipCode" />
                                <p class="text-red-600" v-if="errors.zipCode">
                                    {{ errors.zipCode }}
                                </p>
                            </div>
                        </div>
                    </div>


                    <div class="col-12 mt-3">
                        <h5>Other Information</h5>
                        <div class="p-fluid formgrid grid">

                            <div class="field col-12 md:col-4">
                                <label for="className">Class</label>
                                <Dropdown id="className" v-model="className" :options="classNames" optionLabel="name"
                                    option-value="name" placeholder="Select Class">
                                </Dropdown>
                                <p class="text-red-600" v-if="errors.className">
                                    {{ errors.className }}
                                </p>
                            </div>

                            <div class="field col-12 md:col-4">
                                <label for="paymentStatus">Admission Fee Payment Status</label>
                                <Dropdown id="paymentStatus" v-model="paymentStatus" :options="paymentStatusList"
                                    optionLabel="name" option-value="name" placeholder="Payment Status">
                                </Dropdown>
                                <p class="text-red-600" v-if="errors.paymentStatus">
                                    {{ errors.paymentStatus }}
                                </p>
                            </div>

                            <div class="field col-12 md:col-4">
                                <label for="admissionStatus">Admission Status</label>
                                <Dropdown id="admissionStatus" v-model="admissionStatus" :options="admissionStatusList"
                                    optionLabel="name" option-value="name" placeholder="Admission Status">
                                </Dropdown>
                                <p class="text-red-600" v-if="errors.admissionStatus">
                                    {{ errors.admissionStatus }}
                                </p>
                            </div>

                            <div class="field col-12 md:col-4">
                                <label for="studentsEmail">Student's Login Email</label>
                                <InputText id="studentsEmail" type="text" v-model="studentsEmail" />
                                <p class="text-red-600" v-if="errors.studentsEmail">
                                    {{ errors.studentsEmail }}
                                </p>
                            </div>

                            <div class="field col-4">
                                <label for="password">Student's Login Password</label>
                                <Password v-model="password">
                                    <template #header>
                                        <h6>Pick a password</h6>
                                    </template>
                                    <template #footer>
                                        <Divider />
                                        <p class="mt-2">Suggestions</p>
                                        <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                                            <li>At least one lowercase</li>
                                            <li>At least one uppercase</li>
                                            <li>At least one numeric</li>
                                            <li>Minimum 8 characters</li>
                                        </ul>
                                    </template>
                                </Password>

                                <p class="text-red-600" v-if="errors.password">
                                    {{ errors.password }}
                                </p>
                            </div>

                            <div class="field col-4">
                                <label for="confirmPassword">Confirm Password</label>
                                <Password v-model="confirmPassword">
                                    <template #header>
                                        <h6>Confirm Password</h6>
                                    </template>
                                    <template #footer>
                                        <Divider />
                                        <p class="mt-2">Suggestions</p>
                                        <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                                            <li>At least one lowercase</li>
                                            <li>At least one uppercase</li>
                                            <li>At least one numeric</li>
                                            <li>Minimum 8 characters</li>
                                        </ul>
                                    </template>
                                </Password>

                                <p class="text-red-600" v-if="errors.confirmPassword">
                                    {{ errors.confirmPassword }}
                                </p>
                            </div>

                        </div>
                    </div>

                    <Button type="submit" label="Submit" class="mt-2 mr-2 p-2" :disabled="isSubmitting">
                        <ProgressSpinner v-if="isSubmitting" />
                        <h6 class="p-0 m-0" v-else>Submit</h6>
                    </Button>
                    <Button class="mt-2 bg-red-500 p-2 border-0" @click="resetForm()">Reset</Button>

                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import * as yup from "yup";
import { useForm } from "vee-validate";
import { onMounted, ref } from "vue";
import { divisions } from "../../helpers/dataProvider";
import { districtsByDivision } from "../../helpers/utils";
import fetchData from "../../service/fetch";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const home = ref({
    icon: "pi pi-home",
    to: "/",
});
const items = ref([{ label: "Admission" }, { label: "Admit" }]);

// form drop down options
const districts = ref();
const genders = ref([
    { name: "Male" },
    { name: "Female" }
]);
const classNames = ref();
const bloodGroups = ref([
    { name: "A+" },
    { name: "A-" },
    { name: "B+" },
    { name: "B-" },
    { name: "AB+" },
    { name: "AB-" },
    { name: "O+" },
    { name: "O-" }
]);
const paymentStatusList = ref([
    { name: "Paid" },
    { name: "Unpaid" }
]);

const admissionStatusList = ref([
    { name: "Approved" },
    { name: "Pending" }
]);


const phoneRegExp = /(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/;

// Define a validation schema
const schema = yup.object({
    firstname: yup.string().required().label("First Name"),
    lastname: yup.string().required().label("Last Name"),
    fathersName: yup.string().required().label("Father's Name"),
    mothersName: yup.string().required().label("Mother's Name"),
    birthday: yup.string().required().label("Birthday"),
    studentAddress: yup.string().required().label("Address"),
    division: yup.string().required().label("Division"),
    district: yup.string().required().label("District"),
    zipCode: yup.string().required().label("Zip Code"),
    guardianEmail: yup.string().required().email().label("Guardian's Email is Required"),
    paymentStatus: yup.string().required().label("Payment Status"),
    guardianPhone: yup
        .string()
        .required()
        .matches(phoneRegExp, "Phone number is not valid"),

    gender: yup.string().required().label("Gender"),
    className: yup.string().required().label("Class Name"),
    studentsEmail: yup.string().required().email().label("Student's Email"),

    password: yup.string().required().min(8).label("Password"),
    confirmPassword: yup.string().required().min(8).oneOf([yup.ref('password'), null], 'Passwords not matching').label("Confirm Password"),

});

// Create a form context with the validation schema
const { errors, useFieldModel, handleSubmit, resetForm, isSubmitting } = useForm({
    validationSchema: schema,
});



// or multiple models at once
const [
    firstname,
    lastname,
    birthday,
    gender,
    fathersName,
    mothersName,
    studentAddress,
    division,
    district,
    zipCode,
    guardianEmail,
    guardianPhone,
    className,
    studentsEmail,
    password,
    confirmPassword,
    bloodGroup,
    paymentStatus,
    admissionStatus
] = useFieldModel([
    "firstname",
    "lastname",
    "birthday",
    "gender",
    "fathersName",
    "mothersName",
    "studentAddress",
    "division",
    "district",
    "zipCode",
    "guardianEmail",
    "guardianPhone",
    "className",
    "studentsEmail",
    "password",
    "confirmPassword",
    "bloodGroup",
    "paymentStatus",
    "admissionStatus"
]);





const fetchClassNames = async () => {

    const classInfo = await fetchData.get('academic/class');

    if (classInfo) {
        classNames.value = classInfo.data;
    }
}


const fetchDistricts = () => {
    districts.value = districtsByDivision(division.value);
};

const onInvalidSubmit = async ({ values, errors, results }) => {
    console.log(values)
    console.log(results)

    const errMessage = Object.values(errors);
    errMessage.map((message) => {
        toast.add({ severity: 'error', summary: 'Error!', detail: message, life: 3000 });
    })
}

const submitFormData = async (formData) => {

    formData.confirmPassword = undefined;
    const data = {
        studentData: formData
    }

    const submitData = await fetchData.post('/admission/admit', data);

    if (submitData.status === 'success') {
        toast.add({ severity: 'info', summary: 'Success!', detail: submitData.message, life: 3000 });
        resetForm(
            { paymentStatus: "Paid" }
        );
    }
    else {
        toast.add({ severity: 'error', summary: 'Error!', detail: submitData.message, life: 3000 });
    }
}

const onSubmit = handleSubmit(values => {
    console.log(values, null, 2);
    submitFormData(values);
}, onInvalidSubmit);


onMounted(() => {
    fetchClassNames();
})
</script>

<style lang="scss" scoped>
</style>
