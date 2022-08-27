<template>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <ConfirmDialog group="positionDialog"></ConfirmDialog>

    <div>
        <div class="col-12">
            <div class="card">
                <h5>Teacher's Data Table</h5>
                <DataTable :value="tableData" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id"
                    :rowHover="true" v-model:filters="filters" :filterDisplay="menu" :loading="loading"
                    :filters="filters" responsiveLayout="scroll" :globalFilterFields="['name', 'email', 'phone']">

                    <template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                            <div>
                                <span class="p-input-icon-left mb-2 mr-2">
                                    <i class="pi pi-search" />
                                    <InputText v-model="filters['global'].value" placeholder="Search"
                                        style="width: 100%" />
                                </span>
                                <Button type="button" icon="pi pi-filter-slash" label="Clear"
                                    class="p-button-outlined mb-2" @click="clearFilter" />
                            </div>
                            <div>
                                <Button type="button" icon="pi pi-plus" label="Add Teacher"
                                    class="p-button-outlined mb-2" @click="showAddModal" />
                            </div>
                        </div>
                    </template>

                    <template #empty>
                        No data found.
                    </template>

                    <template #loading>
                        <ProgressSpinner style="width:50px;height:50px" strokeWidth="8" fill="var(--surface-ground)"
                            animationDuration=".5s" />
                    </template>

                    <Column field="name" header="Name" filterField="data.name" style="min-width:12rem">
                        <template #body="{ data }">
                            {{ data.name }}
                        </template>
                    </Column>

                    <Column field="email" header="Email" filterField="data.email" style="min-width:12rem">
                        <template #body="{ data }">
                            {{ data.email }}
                        </template>
                    </Column>

                    <Column field="phone" header="Phone" filterField="data.phone" style="min-width:12rem">
                        <template #body="{ data }">
                            {{ data.phone }}
                        </template>
                    </Column>

                    <Column header="Action" :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                                @click="updateFormModalData(slotProps.data)" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning"
                                @click="deleteTableRaw(slotProps.data)" />
                        </template>
                    </Column>

                </DataTable>
            </div>
        </div>
    </div>

    <Dialog header="Add Teacher" :visible="showAddFormModal" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '50vw' }" :modal="true" :draggable="false" :closable="false">

        <div class="grid grid-cols-2">

            <div class="p-5 col-12 md:col-6">
                <p for="name">Teacher Name</p>
                <InputText id="name" v-model="name" class="w-full" />
                <p> </p>
            </div>

            <div class="p-5 col-12 md:col-6">
                <p for="email">Teacher Email</p>
                <InputText id="email" v-model="email" class="w-full" />
            </div>

            <div class="p-5 col-12 md:col-4">
                <p for="phone">Teacher Phone</p>
                <InputText id="phone" v-model="phone" class="w-full" />
            </div>

            <div v-if="updateData !== true" class="p-5 col-12 md:col-4">
                <p for="password">Password</p>
                <Password id="password" v-model="password" class="w-full" />
            </div>

            <div v-if="updateData !== true" class="p-5 col-12 md:col-4">
                <p for="confirmPassword">Confirm Password</p>
                <Password id="confirmPassword" v-model="confirmPassword" class="w-full" />
            </div>


        </div>

        <template #footer>

            <Button label="Cancel" icon="pi pi-times" @click="closeAddModal" class="p-button-text" />
            <Button type="submit" v-if="updateData !== true" label="Create" icon="pi pi-check"
                @click="addFormSubmitHandler" autofocus />
            <Button type="submit" v-if="updateData === true" label="Update" icon="pi pi-check"
                @click="addFormSubmitHandler" autofocus />

        </template>

    </Dialog>

    <!-- 
    <Dialog header="Update Class" :visible="showUpdateFormModal" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '50vw' }" :modal="true" :draggable="false" :closable="false">
        <div class="grid grid-cols-2">
            <div class="p-5 w-1/2">
                <span class="p-float-label">
                    <Calendar id="startTime" v-model="updateClassStartTime" :timeOnly="true" hourFormat="12"
                        :manualInput="false" />
                    <label for="startTime">Class Starting Time</label>
                    <p class="text-red-600" v-if="updateClassStartTimeError">{{ updateClassStartTimeError }}</p>
                </span>
            </div>
            <div class="p-5 w-1/2">
                <span class="p-float-label">
                    <Calendar id="endTime" v-model="updateClassEndTime" :timeOnly="true" hourFormat="12"
                        :manualInput="false" />
                    <label for="endTime">Class Starting Time</label>
                    <p class="text-red-600" v-if="updateClassEndTimeError">{{ updateClassEndTimeError }}</p>
                </span>
            </div>
        </div>


        <template #footer>
            <Button label="Cancel" icon="pi pi-times" @click="closeUpdateModal" class="p-button-text" />
            <Button type="submit" label="Create" icon="pi pi-check" @click="updateFormSubmitHandler" autofocus />
        </template>

    </Dialog> -->

</template>

<script setup>
// Import dependencies
import { ref, onMounted } from 'vue';
import fetchData from '../../../service/fetch';
// import InputText from 'primevue/inputtext';
// import InputNumber from 'primevue/inputnumber';
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { FilterMatchMode, FilterOperator } from "primevue/api";


// hooks
const toast = useToast();
const confirm = useConfirm();





// states
const tableData = ref([]);

const showAddFormModal = ref(false);
// const showUpdateFormModal = ref(false);

const loading = ref(true);

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    startTime: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    endTime: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    }
})


// Add form field
const name = ref();
const email = ref();
const phone = ref();
const password = ref();
const confirmPassword = ref();
const updateData = ref(false);
const teacherId = ref();

// const currentClassTime = ({})
// const updateClassStartTime = ref();
// const updateClassEndTime = ref();
// const updateClassStartTimeError = ref();
// const updateClassEndTimeError = ref();


// methods
const fetchTableData = async () => {
    const fetchedData = await fetchData.get('user/teacher');

    if (fetchedData) {
        tableData.value = fetchedData.data;
    }
    loading.value = false;
}




// clear filter
const clearFilter = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },

    }
}


// show add class modal
const showAddModal = async () => {
    showAddFormModal.value = true;
}

// close add class modal
const closeAddModal = () => {
    showAddFormModal.value = false;
    updateData.value = false;
    name.value = null;
    email.value = null;
    phone.value = null;
    password.value = null;
};


// // close update class modal
// const closeUpdateModal = () => {
//     showUpdateFormModal.value = false;
// }


// const formateTime = (time) => {
//     let hour = time.getHours();
//     let minute = time.getMinutes();

//     const state = hour >= 12 ? 'PM' : 'AM';

//     const formatedHour = hour < 10 ? `0${hour}` : `${hour}`;
//     const formatedMinute = minute < 10 ? `0${minute}` : `${minute}`;

//     const formatedTime = formatedHour + ":" + formatedMinute + " " + state;
//     return formatedTime;
// }


const addFormSubmitHandler = async () => {

    if (!name.value || !email.value || !phone.value || ((!password.value || !confirmPassword.value) && updateData.value !== true)) {
        toast.add({ severity: 'error', summary: 'Error!', detail: "All fields are required!", life: 3000 });
    }
    else if ((password.value !== confirmPassword.value) && updateData.value !== true) {
        toast.add({ severity: 'error', summary: 'Error!', detail: "Password Not Matched!", life: 3000 });
    }
    else {

        try {
            const teacher = {};
            if (updateData.value === true) {
                teacher.teacherData = {
                    id: teacherId,
                    name: name.value,
                    email: email.value,
                    phone: phone.value,
                    password: password.value
                };
            }
            else {
                teacher.teacherData = {
                    name: name.value,
                    email: email.value,
                    phone: phone.value,
                    password: password.value
                };
            }

            const teacherData = updateData.value === true ? await fetchData.put('user/teacher', teacher) : await fetchData.post('user/teacher', teacher);

            if (teacherData.status === 'fail') {
                toast.add({ severity: 'error', summary: 'Error!', detail: teacherData.message, life: 3000 });
            }
            else if (teacherData.status === 'success') {
                toast.add({ severity: 'info', summary: 'Success!', detail: teacherData.message, life: 3000 });
                fetchTableData();
                showAddFormModal.value = false;

            } else {
                toast.add({ severity: 'warn', summary: 'Error!', detail: 'Internal Server Error.', life: 3000 });
            }
        } catch (err) {
            toast.add({ severity: 'error', summary: 'Error!', detail: err, life: 3000 });
        }
    }
    updateData.value = false;
    name.value = null;
    email.value = null;
    phone.value = null;
    password.value = null;
    showAddFormModal.value = false;
}


// // show update class modal
const updateFormModalData = (data) => {
    showAddFormModal.value = true;
    updateData.value = true;

    teacherId.value = data._id;

    name.value = data.name;
    email.value = data.email;
    phone.value = data.phone;

    showAddFormModal.value = true;
}

// const updateFormSubmitHandler = async () => {
//     // updateClassStartTimeError.value = updateClassStartTimeError.value ? "" : "Class start time required";
//     // updateClassEndTimeError.value = updateClassEndTimeError.value ? "" : "Class end time required";

//     // if (!updateClassStartTimeError.value && !updateClassEndTimeError.value) {

//     const updateData = {
//         currentClassTime: currentClassTime.value,
//         updatedClassTime: {
//             startTime: formateTime(updateClassStartTime.value),
//             endTime: formateTime(updateClassEndTime.value)
//         }
//     }

//     const updateRequest = await fetchData.put('academic/classtime', updateData);

//     if (updateRequest.status === 'fail') {
//         toast.add({ severity: 'error', summary: 'Error!', detail: updateRequest.message, life: 3000 });
//     }
//     else if (updateRequest.status === 'success') {
//         toast.add({ severity: 'info', summary: 'Success!', detail: updateRequest.message, life: 3000 });
//         fetchTableData();
//         showUpdateFormModal.value = false;
//     } else {
//         toast.add({ severity: 'warn', summary: 'Error!', detail: 'Internal Server Error.', life: 3000 });
//     }
//     // }
// }


// delete class 
const deleteTableRaw = async (data) => {

    confirm.require({
        message: 'Do you want to delete this class time?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        accept: async () => {

            const dataToDelete = {
                email: data.email
            };

            try {
                const deleteRequest = await fetchData.delete('user/teacher', dataToDelete);

                console.log(deleteRequest);

                if (deleteRequest.status === 'success') {
                    toast.add({ severity: 'info', summary: 'Success!', detail: deleteRequest.message, life: 3000 });
                    fetchTableData();
                } else if (deleteRequest.status === 'fail') {
                    toast.add({ severity: 'error', summary: 'Error!', detail: deleteRequest.message, life: 3000 });
                }
                else {
                    toast.add({ severity: 'error', summary: 'Error!', detail: 'Internal Server Error', life: 3000 });
                }
            } catch (err) {
                toast.add({ severity: 'error', summary: 'Error!', detail: err, life: 3000 });
            }
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
}

onMounted(() => {
    fetchTableData();
})

</script>

<style lang="scss" scoped>
</style>