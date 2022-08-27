<template>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <ConfirmDialog group="positionDialog"></ConfirmDialog>

    <div>
        <div class="col-12">
            <div class="card">
                <h5>Pending Application Table</h5>
                <DataTable :value="tableData" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id"
                    :rowHover="true" v-model:filters="filters" :filterDisplay="menu" :loading="loading"
                    :filters="filters" responsiveLayout="scroll"
                    :globalFilterFields="['firstname', 'lastname', 'className']">

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

                        </div>
                    </template>

                    <template #empty>
                        No data found.
                    </template>

                    <template #loading>
                        <ProgressSpinner style="width:50px;height:50px" strokeWidth="8" fill="var(--surface-ground)"
                            animationDuration=".5s" />
                    </template>


                    <Column field="firstname" header="First Name" filterField="data.firstname" style="min-width:12rem">
                        <template #body="{ data }">
                            {{ data.firstname }}
                        </template>
                    </Column>

                    <Column field="lastname" header="Last Name" filterField="data.lastname" style="min-width:12rem">
                        <template #body="{ data }">
                            {{ data.lastname }}
                        </template>
                    </Column>

                    <Column field="studentsEmail" header="Email" filterField="data.studentsEmail"
                        style="min-width:12rem">
                        <template #body="{ data }">
                            {{ data.studentsEmail }}
                        </template>
                    </Column>

                    <Column field="className" header="Class Name" filterField="data.className" style="min-width:12rem">
                        <template #body="{ data }">
                            {{ data.className }}
                        </template>
                    </Column>

                    <Column field="admissionStatus" header="Status" filterField="data.admissionStatus"
                        style="min-width:12rem">
                        <template #body="{ data }">
                            {{ data.admissionStatus }}
                        </template>
                    </Column>


                    <Column header="Action" :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <Button icon="pi pi-eye" class="p-button-rounded p-button-secondary mr-2"
                                @click="viewData(slotProps.data)" />

                            <Button icon="pi pi-check" class="p-button-rounded p-button-success mr-2"
                                @click="acceptApplication()" />

                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning"
                                @click="rejectApplication()" />

                        </template>
                    </Column>

                </DataTable>
            </div>
        </div>
    </div>

    <Dialog header="Applicants Details" :visible="showViewModal" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '50vw' }" :modal="true" :draggable="false" :closable="false">

        <div class="col-12">
            <div class="grid">
                <div class="col-6 bg-gray-200 text-2xl">
                    Field
                </div>
                <div class="col-6 bg-gray-200 text-2xl">
                    Value
                </div>

                <div class="col-6 ">
                    First Name
                </div>
                <div class="col-6">
                    {{ viewModalData.firstname }}
                </div>

                <div class="col-6 ">
                    Last Name
                </div>
                <div class="col-6">
                    {{ viewModalData.lastname }}
                </div>

                <div class="col-6 ">
                    Birth Date
                </div>
                <div class="col-6">
                    {{ viewModalData.birthday }}
                </div>

                <div class="col-6 ">
                    Application Status
                </div>
                <div class="col-6">
                    {{ viewModalData.admissionStatus }}
                </div>

                <div class="col-6 ">
                    Gender
                </div>
                <div class="col-6">
                    {{ viewModalData.gender }}
                </div>

                <div class="col-6 ">
                    Fathers Name
                </div>
                <div class="col-6">
                    {{ viewModalData.fathersName }}
                </div>

                <div class="col-6 ">
                    Mothers Name
                </div>
                <div class="col-6">
                    {{ viewModalData.mothersName }}
                </div>

            </div>
        </div>

        <template #footer>
            <Button label="Cancel" icon="pi pi-times" class="p-button-rounded p-button-warning"
                @click="closeViewModal" />
            <Button label="Reject" icon="pi pi-trash" class="p-button-rounded p-button-danger mr-2"
                @click="rejectApplication()" />
            <Button label="Accept" icon="pi pi-check" class="p-button-rounded p-button-success"
                @click="acceptApplication()" />
        </template>

    </Dialog>


</template>

<script setup>
// Import dependencies
import { ref, onMounted } from 'vue';
import fetchData from '../../service/fetch';
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



const showViewModal = ref(false);

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



const viewModalData = ref();
// const viewModalDataKeys = ref();

// methods
const fetchTableData = async () => {
    const fetchedData = await fetchData.get('admission/admit');

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






const viewData = (data) => {
    showViewModal.value = true;
    viewModalData.value = data;
}

const closeViewModal = () => {
    showViewModal.value = false;
}






// delete class 
const rejectApplication = async () => {

    const data = viewModalData.value;

    confirm.require({
        message: 'Are you sure?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        accept: async () => {

            const dataToDelete = {
                applicationId: data._id
            };

            try {
                const deleteRequest = await fetchData.delete('admission/admit', dataToDelete);

                if (deleteRequest.status === 'success') {
                    toast.add({ severity: 'info', summary: 'Success!', detail: deleteRequest.message, life: 3000 });
                    fetchTableData();
                    closeViewModal();
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


const acceptApplication = async () => {

    const data = viewModalData.value;
    const dataToDelete = {
        applicationId: data._id
    };

    confirm.require({
        message: 'Are you sure?',
        header: 'Approve Confirmation',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-success',
        accept: async () => {

            const studentData = {
                studentData: data
            }

            studentData.studentData.admissionStatus = "Approved";

            try {
                const submitData = await fetchData.post('/admission/admit', studentData);

                if (submitData.status === 'success') {
                    toast.add({ severity: 'info', summary: 'Success!', detail: submitData.message, life: 3000 });
                    await fetchData.delete('admission/admit', dataToDelete);
                    fetchTableData();
                    closeViewModal();
                }
                else {
                    toast.add({ severity: 'error', summary: 'Error!', detail: submitData.message, life: 3000 });
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