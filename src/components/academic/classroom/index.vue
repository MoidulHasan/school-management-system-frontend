<template>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <ConfirmDialog group="positionDialog"></ConfirmDialog>

    <div>
        <div class="col-12">
            <div class="card">
                <h5>Class Room Data Table</h5>
                <DataTable :value="classRoomData" :paginator="true" class="p-datatable-gridlines" :rows="10"
                    dataKey="id" :rowHover="true" v-model:filters="filters" :filterDisplay="menu" :loading="loading"
                    :filters="filters" responsiveLayout="scroll" :globalFilterFields="['number']">

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
                                <Button type="button" icon="pi pi-plus" label="Create Class Room"
                                    class="p-button-outlined mb-2" @click="addClassRoom" />
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



                    <Column field="number" header="Room Number" filterField="data.number" style="min-width:12rem">
                        <template #body="{ data }">
                            {{ data.number }}
                        </template>
                    </Column>

                    <Column header="Action" :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                                @click="editClassRoom(slotProps.data)" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning"
                                @click="deleteClassRoom(slotProps.data)" />
                        </template>
                    </Column>

                </DataTable>
            </div>
        </div>
    </div>

    <Dialog header="Create Class Room" :visible="showAddClassRoom" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '50vw' }" :modal="true" :draggable="false" :closable="false">
        <div class="grid grid-cols-1">
            <div class="p-5 w-1/2">
                <span class="p-float-label">
                    <InputNumber :min="1" :showButtons="true" id="ClassRoomNumber" type="text"
                        v-model="classRoomNumber" />
                    <label for="username">Class Room Number</label>
                    <p class="text-red-600" v-if="classRoomNumberError">{{ classRoomNumberError }}</p>
                </span>
            </div>
        </div>


        <template #footer>
            <Button label="Cancel" icon="pi pi-times" @click="closeModal" class="p-button-text" />
            <Button type="submit" label="Create" icon="pi pi-check" @click="addFormSubmitHandler" autofocus />
        </template>

    </Dialog>


    <Dialog header="Update Class" :visible="showUpdateClassRoom" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '50vw' }" :modal="true" :draggable="false" :closable="false">
        <div class="grid grid-cols-1">
            <div class="p-5 w-1/2">
                <span class="p-float-label">
                    <InputNumber :min="1" :showButtons="true" id="ClassRoomNumber" type="text"
                        v-model="updateClassRoomNumber" />
                    <label for="username">Class Room Number</label>
                    <p class="text-red-600" v-if="updateClassRoomNumberError">{{ updateClassRoomNumberError }}</p>
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
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { FilterMatchMode, FilterOperator } from "primevue/api";


// hooks
const toast = useToast();
const confirm = useConfirm();





// states
const classRoomData = ref([]);
const showAddClassRoom = ref(false);
const showUpdateClassRoom = ref(false);
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    }

})
const loading = ref(true);


// Add form field
const classRoomNumber = ref();
const classRoomNumberError = ref();

const updateClassRoomNumber = ref('');
const updateClassRoomNumberError = ref();
const currentClassRoomNumber = ref();

// methods
const fetchAllClassRoom = async () => {
    const classRoomInfo = await fetchData.get('academic/classroom');

    if (classRoomInfo) {
        classRoomData.value = classRoomInfo.data;
    }
    loading.value = false;
}

// show add class modal
const addClassRoom = async () => {
    showAddClassRoom.value = true;
}

// close add class modal
const closeModal = () => {
    showAddClassRoom.value = false;
};


// clear filter
const clearFilter = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        }
    }
}

// show edit class modal
const editClassRoom = (data) => {
    showUpdateClassRoom.value = true;
    currentClassRoomNumber.value = data.number;
    updateClassRoomNumber.value = data.number;
}

// close update class modal
const closeUpdateModal = () => {
    showUpdateClassRoom.value = false;
}

// delete class 
const deleteClassRoom = async (data) => {
    confirm.require({
        message: 'Do you want to delete this class room?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        accept: async () => {
            const classRoomData = {
                classRoom: data.number
            };
            console.log(classRoomData);

            const classRoomDelete = await fetchData.delete('academic/classroom', classRoomData);

            console.log(classRoomDelete);

            if (classRoomDelete.status === 'success') {
                toast.add({ severity: 'info', summary: 'Success!', detail: classRoomDelete.message, life: 3000 });
                fetchAllClassRoom();
            } else if (classRoomDelete.status === 'fail') {
                toast.add({ severity: 'error', summary: 'Error!', detail: classRoomDelete.message, life: 3000 });
            }
            else {
                toast.add({ severity: 'warn', summary: 'Error!', detail: 'Internal Server Error', life: 3000 });
            }
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });

}

const addFormSubmitHandler = async () => {
    console.log(classRoomNumber.value);
    classRoomNumberError.value = classRoomNumber.value ? "" : "Class room number required";

    if (!classRoomNumberError.value) {
        const classRoomData = {
            classRoom: classRoomNumber.value,
        };

        console.log(classRoomData);

        const classRoomAdd = await fetchData.post('academic/classroom', classRoomData);

        if (classRoomAdd.status === 'fail') {
            toast.add({ severity: 'error', summary: 'Error!', detail: classRoomAdd.message, life: 3000 });
        }
        else if (classRoomAdd.status === 'success') {
            toast.add({ severity: 'info', summary: 'Success!', detail: classRoomAdd.message, life: 3000 });
            fetchAllClassRoom();
            showAddClassRoom.value = false;
        } else {
            toast.add({ severity: 'warn', summary: 'Error!', detail: 'Internal Server Error.', life: 3000 });
        }
    }
}


const updateFormSubmitHandler = async () => {
    updateClassRoomNumberError.value = updateClassRoomNumber.value > 0 ? "" : "Class Room Number Is Required";

    if (!updateClassRoomNumberError.value) {
        const classRoomData = {
            prevClassRoom: currentClassRoomNumber.value,
            nextClassRoom: updateClassRoomNumber.value,
        };

        const classRoomAdd = await fetchData.put('academic/classroom', classRoomData);

        if (classRoomAdd.status === 'fail') {
            toast.add({ severity: 'error', summary: 'Error!', detail: classRoomAdd.message, life: 3000 });
        }
        else if (classRoomAdd.status === 'success') {
            toast.add({ severity: 'info', summary: 'Success!', detail: classRoomAdd.message, life: 3000 });
            fetchAllClassRoom();
            showUpdateClassRoom.value = false;
        } else {
            toast.add({ severity: 'warn', summary: 'Error!', detail: 'Internal Server Error.', life: 3000 });
        }
    }
}

onMounted(() => {
    fetchAllClassRoom();
})

</script>

<style lang="scss" scoped>
</style>