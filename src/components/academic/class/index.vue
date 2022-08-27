<template>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <ConfirmDialog group="positionDialog"></ConfirmDialog>

    <div>
        <div class="col-12">
            <div class="card">
                <h5>Class Data Table</h5>
                <DataTable :value="classData" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id"
                    :rowHover="true" v-model:filters="filters" :filterDisplay="menu" :loading="loading"
                    :filters="filters" responsiveLayout="scroll" :globalFilterFields="['name', 'serialNo']">

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
                                <Button type="button" icon="pi pi-plus" label="Create Class"
                                    class="p-button-outlined mb-2" @click="addClass" />
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

                    <Column :sortable="true" :sortField="'serialNo'" header="Serial No" filterField="data.serialNo"
                        style="min-width:12rem">
                        <template #body="{ data }">
                            <span style="margin-left: .5em; vertical-align: middle" class="image-text">{{
                                    data.serialNo
                            }}</span>
                        </template>
                    </Column>

                    <Column header="Action" :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                                @click="editClass(slotProps.data)" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning"
                                @click="deleteClass(slotProps.data)" />
                        </template>
                    </Column>

                </DataTable>
            </div>
        </div>
    </div>

    <Dialog header="Create Class" :visible="showAddClass" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '50vw' }" :modal="true" :draggable="false" :closable="false">
        <div class="grid grid-cols-2">
            <div class="p-5 w-1/2">
                <span class="p-float-label">
                    <InputText id="ClassName" type="text" v-model="className" />
                    <label for="username">Class Name</label>
                    <p class="text-red-600" v-if="classNameError">{{ classNameError }}</p>
                </span>
            </div>

            <div class="p-5 w-1/2">
                <span class="p-float-label">
                    <InputNumber :min="1" :showButtons="true" id="serialNo" type="text" v-model="serialNo" />
                    <label for="serialNo">Serial No</label>
                    <p class="text-red-600" v-if="serialNoError">{{ serialNoError }}</p>
                </span>
            </div>
        </div>


        <template #footer>
            <Button label="Cancel" icon="pi pi-times" @click="closeModal" class="p-button-text" />
            <Button type="submit" label="Create" icon="pi pi-check" @click="addFormSubmitHandler" autofocus />
        </template>

    </Dialog>


    <Dialog header="Update Class" :visible="showUpdateClass" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '50vw' }" :modal="true" :draggable="false" :closable="false">
        <div class="grid grid-cols-2">
            <div class="p-5 w-1/2">
                <span class="p-float-label">
                    <InputText id="ClassName" type="text" v-model="updateClassName" />
                    <label for="username">Class Name</label>
                    <p class="text-red-600" v-if="updateClassNameError">{{ updateClassNameError }}</p>
                </span>
            </div>

            <div class="p-5 w-1/2">
                <span class="p-float-label">
                    <InputNumber :min="1" :showButtons="true" id="serialNo" type="text" v-model="updateSerialNo" />
                    <label for="serialNo">Serial No</label>
                    <p class="text-red-600" v-if="updateSerialNoError">{{ updateSerialNoError }}</p>
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
const classData = ref([]);
const showAddClass = ref(false);
const showUpdateClass = ref(false);
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    serialNo: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    }
})
const loading = ref(true);


// form field
const className = ref('');
const classNameError = ref();
const serialNo = ref();
const serialNoError = ref();

const updateClassName = ref('');
const updateClassNameError = ref();
const updateSerialNo = ref();
const updateSerialNoError = ref();
const currentClassName = ref();

// methods
const fetchAllClass = async () => {
    const classInfo = await fetchData.get('academic/class');

    console.log(classInfo);

    if (classInfo) {
        classData.value = classInfo.data;
    }
    loading.value = false;
}

// show add class modal
const addClass = async () => {
    showAddClass.value = true;
}

// close add class modal
const closeModal = () => {
    showAddClass.value = false;
};


// clear filter
const clearFilter = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },
        serialNo: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        }
    }
}

// show edit class modal
const editClass = (data) => {
    console.log(data);
    showUpdateClass.value = true;
    currentClassName.value = data.name;
    updateClassName.value = data.name;
    updateSerialNo.value = data.serialNo;
}

// close update class modal
const closeUpdateModal = () => {
    showUpdateClass.value = false;
}

// delete class 
const deleteClass = async (data) => {
    confirm.require({
        message: 'Do you want to delete this class?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        accept: async () => {
            const classData = {
                className: data.name
            };
            console.log(classData);

            const classDelete = await fetchData.delete('academic/class', classData);

            console.log(classDelete);

            if (classDelete.status === 'success') {
                toast.add({ severity: 'info', summary: 'Success!', detail: classDelete.message, life: 3000 });
                fetchAllClass();
            } else if (classDelete.status === 'fail') {
                toast.add({ severity: 'error', summary: 'Error!', detail: classDelete.message, life: 3000 });
            }
            else {
                toast.add({ severity: 'warn', summary: 'Sorry!', detail: classDelete.message, life: 3000 });
            }
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });

}

const addFormSubmitHandler = async () => {
    console.log(className.value, serialNo.value);
    classNameError.value = className.value.length > 0 ? "" : "Class Name Required";
    serialNoError.value = serialNo.value > 0 ? "" : "Class Serial No Required";

    if (!classNameError.value && !serialNoError.value) {
        const classData = {
            className: className.value,
            serialNo: serialNo.value
        };

        console.log(classData);

        const classAdd = await fetchData.post('academic/class', classData);

        if (classAdd.status === 'fail') {
            toast.add({ severity: 'error', summary: 'Error!', detail: classAdd.message, life: 3000 });
        }
        else if (classAdd.status === 'success') {
            toast.add({ severity: 'info', summary: 'Success!', detail: classAdd.message, life: 3000 });
            fetchAllClass();
            showAddClass.value = false;
        } else {
            toast.add({ severity: 'warn', summary: 'Sorry!', detail: classAdd.message, life: 3000 });
        }


    }
}


const updateFormSubmitHandler = async () => {
    updateClassNameError.value = updateClassName.value.length > 0 ? "" : "Class Name Required";
    updateSerialNoError.value = updateSerialNo.value > 0 ? "" : "Class Serial No Required";

    if (!classNameError.value && !updateSerialNoError.value) {
        const classData = {
            currentClassName: currentClassName.value,
            className: updateClassName.value,
            serialNo: updateSerialNo.value
        };

        const classAdd = await fetchData.put('academic/class', classData);

        if (classAdd.status === 'fail') {
            toast.add({ severity: 'error', summary: 'Error!', detail: classAdd.message, life: 3000 });
        }
        else if (classAdd.status === 'success') {
            toast.add({ severity: 'info', summary: 'Success!', detail: classAdd.message, life: 3000 });
            fetchAllClass();
            showUpdateClass.value = false;
        } else {
            toast.add({ severity: 'warn', summary: 'Sorry!', detail: classAdd.message, life: 3000 });
        }


    }
}

onMounted(() => {
    fetchAllClass();
})

</script>

<style lang="scss" scoped>
</style>