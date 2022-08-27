<template>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <ConfirmDialog group="positionDialog"></ConfirmDialog>

    <div>
        <div class="col-12">
            <div class="card">
                <h5>Student Data Table</h5>
                <DataTable :value="tableData" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id"
                    :rowHover="true" v-model:filters="filters" :filterDisplay="menu" :loading="loading"
                    :filters="filters" responsiveLayout="scroll" :globalFilterFields="['firstname', 'lastname']">

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
                                <Button type="button" icon="pi pi-plus" label="Admit Student"
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

                    <Column field="serialNo" header="Serial No" filterField="data.serialNo" style="max-width:1rem">
                        <template #body="{ data }">
                            {{ data.serialNo }}
                        </template>
                    </Column>

                    <Column field="firstname" header="First Name" filterField="data.startTime" style="min-width:12rem">
                        <template #body="{ data }">
                            {{ data.firstname }}
                        </template>
                    </Column>

                    <Column field="lastname" header="Last Name" filterField="data.endTime" style="min-width:12rem">
                        <template #body="{ data }">
                            {{ data.lastname }}
                        </template>
                    </Column>

                    <Column field="studentsEmail" header="" filterField="data.studentsEmail" style="min-width:12rem">
                        <template #body="{ data }">
                            {{ data.studentsEmail }}
                        </template>
                    </Column>

                    <Column header="Action" :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                                @click="setUpdateFormModalData(slotProps.data)" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning"
                                @click="deleteTableRaw(slotProps.data)" />
                        </template>
                    </Column>

                </DataTable>
            </div>
        </div>
    </div>

    <Dialog header="Create Class Time Slot" :visible="showAddFormModal"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '50vw' }" :modal="true" :draggable="false"
        :closable="false">
        <div class="grid grid-cols-2">
            <div class="p-5 w-1/2">
                <span class="p-float-label">
                    <Calendar id="startTime" v-model="classStartTime" :timeOnly="true" hourFormat="12"
                        :manualInput="false" />
                    <label for="startTime">Class Starting Time</label>
                    <p class="text-red-600" v-if="classStartTimeError">{{ classStartTimeError }}</p>
                </span>
            </div>
            <div class="p-5 w-1/2">
                <span class="p-float-label">
                    <Calendar id="endTime" v-model="classEndTime" :timeOnly="true" hourFormat="12"
                        :manualInput="false" />
                    <label for="endTime">Class Ending Time</label>
                    <p class="text-red-600" v-if="classEndTimeError">{{ classEndTimeError }}</p>
                </span>
            </div>
        </div>


        <template #footer>
            <Button label="Cancel" icon="pi pi-times" @click="closeAddModal" class="p-button-text" />
            <Button type="submit" label="Create" icon="pi pi-check" @click="addFormSubmitHandler" autofocus />
        </template>

    </Dialog>


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

    </Dialog>

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
const showUpdateFormModal = ref(false);

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
const classStartTime = ref();
const classEndTime = ref();
const classStartTimeError = ref();
const classEndTimeError = ref();


const currentClassTime = ({})
const updateClassStartTime = ref();
const updateClassEndTime = ref();
const updateClassStartTimeError = ref();
const updateClassEndTimeError = ref();


// methods
const fetchTableData = async () => {
    const fetchedData = await fetchData.get('user/students');

    if (fetchedData) {
        tableData.value = fetchedData.data;
    }
    loading.value = false;
}




// clear filter
const clearFilter = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        startTime: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },
        endTime: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        }
    }
}


// show add class modal
const showAddModal = async () => {
    showAddFormModal.value = true;
}

// close add class modal
const closeAddModal = () => {
    showAddFormModal.value = false;
};


// close update class modal
const closeUpdateModal = () => {
    showUpdateFormModal.value = false;
}


const formateTime = (time) => {
    let hour = time.getHours();
    let minute = time.getMinutes();

    const state = hour >= 12 ? 'PM' : 'AM';

    const formatedHour = hour < 10 ? `0${hour}` : `${hour}`;
    const formatedMinute = minute < 10 ? `0${minute}` : `${minute}`;

    const formatedTime = formatedHour + ":" + formatedMinute + " " + state;
    return formatedTime;
}


const addFormSubmitHandler = async () => {

    classStartTimeError.value = classStartTime.value ? "" : "Class start time required";
    classEndTimeError.value = classEndTime.value ? "" : "Class end time required";

    if (!classStartTimeError.value && !classEndTimeError.value) {
        const classTimeData = {
            startTime: formateTime(classStartTime.value),
            endTime: formateTime(classEndTime.value)
        };



        try {
            const addDataRequest = await fetchData.post('academic/classtime', classTimeData);

            if (addDataRequest.status === 'fail') {
                toast.add({ severity: 'error', summary: 'Error!', detail: addDataRequest.message, life: 3000 });
            }
            else if (addDataRequest.status === 'success') {
                toast.add({ severity: 'info', summary: 'Success!', detail: addDataRequest.message, life: 3000 });
                fetchTableData();
                showAddFormModal.value = false;
            } else {
                toast.add({ severity: 'warn', summary: 'Error!', detail: 'Internal Server Error.', life: 3000 });
            }
        } catch (err) {
            toast.add({ severity: 'error', summary: 'Error!', detail: err, life: 3000 });
        }
    }
}


// show update class modal
const setUpdateFormModalData = (data) => {
    showUpdateFormModal.value = true;

    currentClassTime.value = {
        id: data._id,
        startTime: data.startTime,
        endTime: data.endTime
    };

    updateClassStartTime.value = data.startTime;
    updateClassEndTime.value = data.endTime;
}

const updateFormSubmitHandler = async () => {
    // updateClassStartTimeError.value = updateClassStartTimeError.value ? "" : "Class start time required";
    // updateClassEndTimeError.value = updateClassEndTimeError.value ? "" : "Class end time required";

    // if (!updateClassStartTimeError.value && !updateClassEndTimeError.value) {

    const updateData = {
        currentClassTime: currentClassTime.value,
        updatedClassTime: {
            startTime: formateTime(updateClassStartTime.value),
            endTime: formateTime(updateClassEndTime.value)
        }
    }

    const updateRequest = await fetchData.put('academic/classtime', updateData);

    if (updateRequest.status === 'fail') {
        toast.add({ severity: 'error', summary: 'Error!', detail: updateRequest.message, life: 3000 });
    }
    else if (updateRequest.status === 'success') {
        toast.add({ severity: 'info', summary: 'Success!', detail: updateRequest.message, life: 3000 });
        fetchTableData();
        showUpdateFormModal.value = false;
    } else {
        toast.add({ severity: 'warn', summary: 'Error!', detail: 'Internal Server Error.', life: 3000 });
    }
    // }
}


// delete class 
const deleteTableRaw = async (data) => {
    console.log(data);
    confirm.require({
        message: 'Do you want to delete this class time?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        accept: async () => {

            const dataToDelete = {
                classTimeid: data._id
            };

            try {
                const deleteRequest = await fetchData.delete('academic/classtime', dataToDelete);

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