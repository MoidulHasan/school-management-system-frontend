<template>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <ConfirmDialog group="positionDialog"></ConfirmDialog>

    <div>
        <div class="col-12">
            <div class="card">
                <div class="flex flex-row items-center p-3">
                    <h5 class="text-justify mr-3 pt-3">Subject Table </h5>
                    <!-- <Dropdown v-model="selectedClass" :options="classData" optionLabel="name" optionValue="name"
                        @change="fetchAllsubject" placeholder="Select a Class" /> -->
                </div>
                <DataTable :value="subjectData" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id"
                    :rowHover="true" v-model:filters="filters" :filterDisplay="menu" :loading="loading"
                    :filters="filters" responsiveLayout="scroll" :globalFilterFields="['name', 'class', 'serialNo']">

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
                                    class="p-button-outlined mb-2" @click="addSubject" />
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

                    <Column :sortable="true" :sortField="'name'" header="Class Name" filterField="data.name"
                        style="min-width:12rem">
                        <template #body="{ data }">
                            <span style="margin-left: .5em; vertical-align: middle" class="image-text">{{
                                    data.class
                            }}</span>
                        </template>
                    </Column>

                    <Column header="Action" :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                                @click="editSubject(slotProps.data)" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning"
                                @click="deleteSubject(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>

    <Dialog header="Create Subject" :visible="addSubject_Show" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '50vw' }" :modal="true" :draggable="false" :closable="false">
        <div class="grid grid-cols-2">
            <div class="p-5 w-1/2">
                <span class="p-float-label">
                    <!-- <InputText id="ClassName" type="text" v-model="className" /> -->
                    <Dropdown v-model="AddSubject_SelectedClass" :options="classData" optionLabel="name"
                        optionValue="name" @change="fetchAllsubject" placeholder="Select a Class" />
                    <p class="text-red-600" v-if="addSubject_ClassNameError">{{ addSubject_ClassNameError }}</p>
                </span>
            </div>

            <div class="p-5 w-1/2">
                <span class="p-float-label">
                    <InputText id="SubjectName" type="text" v-model="addSubject_SubjectName" />

                    <!-- <InputNumber :min="1" :showButtons="true" id="serialNo" type="text" v-model="serialNo" /> -->
                    <label for="serialNo">Subject Name</label>
                    <p class="text-red-600" v-if="addSubject_SubjectNameError">{{ addSubject_SubjectNameError }}</p>
                </span>
            </div>
        </div>


        <template #footer>
            <Button label="Cancel" icon="pi pi-times" @click="closeModal" class="p-button-text" />
            <Button type="submit" label="Create" icon="pi pi-check" @click="addFormSubmitHandler" autofocus />
        </template>

    </Dialog>

    <Dialog header="Update Subject" :visible="updateSubject_Show" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '50vw' }" :modal="true" :draggable="false" :closable="false">
        <div class="grid grid-cols-2">
            <div class="p-5 w-1/2">
                <span class="p-float-label">
                    <!-- <InputText id="ClassName" type="text" v-model="className" /> -->
                    <Dropdown v-model="updateSubject_SelectedClass" :options="classData" optionLabel="name"
                        optionValue="name" placeholder="Select a Class" />
                    <p class="text-red-600" v-if="updateSubject_ClassNameError">{{ updateSubject_ClassNameError }}</p>
                </span>
            </div>

            <div class="p-5 w-1/2">
                <span class="p-float-label">
                    <InputText id="SubjectName" type="text" v-model="updateSubject_SubjectName" />

                    <!-- <InputNumber :min="1" :showButtons="true" id="serialNo" type="text" v-model="serialNo" /> -->
                    <label for="serialNo">Subject Name</label>
                    <p class="text-red-600" v-if="updateSubject_SubjectNameError">{{ updateSubject_SubjectNameError }}
                    </p>
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
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import Dropdown from 'primevue/dropdown';
import ProgressSpinner from 'primevue/progressspinner';


// hooks
const toast = useToast();
const confirm = useConfirm();





// states
const classData = ref();
const subjectData = ref([]);

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    className: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    }
})
const loading = ref(true);

const selectedClass = ref();

// add subject form state
const addSubject_Show = ref(false);
const AddSubject_SelectedClass = ref();
const addSubject_SubjectName = ref();
const addSubject_ClassNameError = ref('');
const addSubject_SubjectNameError = ref('')


// Update subject states
const updateSubject_Show = ref(false)
const updateSubject_SelectedClass = ref();
const updateSubject_SubjectName = ref();

const updateSubject_ClassNameError = ref('');
const updateSubject_SubjectNameError = ref('')

const updateSubject_SubjectId = ref();


// methods

// fetch all class
const fetchAllClass = async () => {
    const classInfo = await fetchData.get('academic/class');

    if (classInfo) {
        classData.value = classInfo.data;
        loading.value = false;
    }
}


const fetchAllsubject = async () => {
    const subjectInfo = selectedClass.value ? await fetchData.get(`academic/subject?className=${selectedClass.value}`) : await fetchData.get(`academic/subject`);

    if (subjectInfo) {
        subjectData.value = subjectInfo.data;
        loading.value = false;
    }
}


// clear filter
const clearFilter = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },
        className: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        }
    }
}

/**
 * @add_subject_related_Method 
 */

// show add subject modal
const addSubject = async () => {
    addSubject_Show.value = true;
}

// close add Subject modal
const closeModal = () => {
    addSubject_Show.value = false;
};

// add form submission handler
const addFormSubmitHandler = async () => {
    console.log(AddSubject_SelectedClass.value, addSubject_SubjectName.value);

    addSubject_ClassNameError.value = AddSubject_SelectedClass.value.length > 0 ? "" : "Class Name Required";
    addSubject_SubjectNameError.value = addSubject_SubjectName.value.length > 0 ? "" : "Subject Name Required";

    if (!addSubject_ClassNameError.value && !addSubject_SubjectNameError.value) {
        const subjectData = {
            className: AddSubject_SelectedClass.value,
            subjectName: addSubject_SubjectName.value
        };

        console.log(subjectData);

        const subjectAdd = await fetchData.post('academic/subject', subjectData);

        if (subjectAdd.status === 'fail') {
            toast.add({ severity: 'error', summary: 'Error!', detail: subjectAdd.message, life: 3000 });
        }
        else if (subjectAdd.status === 'success') {
            toast.add({ severity: 'info', summary: 'Success!', detail: subjectAdd.message, life: 3000 });
            fetchAllsubject();
            addSubject_Show.value = false;
        } else {
            toast.add({ severity: 'warn', summary: 'Sorry!', detail: subjectAdd.message, life: 3000 });
        }
    }
}


/**
 * !Delete Related Methods
 */

// delete class 
const deleteSubject = async (data) => {
    console.log(data._id);
    confirm.require({
        message: 'Do you want to delete this subject?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        accept: async () => {
            const subjectData = {
                subjectId: data._id
            };

            const subjectDelete = await fetchData.delete('academic/subject', subjectData);

            console.log(subjectDelete);

            if (subjectDelete.status === 'success') {
                toast.add({ severity: 'info', summary: 'Success!', detail: subjectDelete.message, life: 3000 });
                fetchAllsubject();
            } else if (subjectDelete.status === 'fail') {
                toast.add({ severity: 'error', summary: 'Error!', detail: subjectDelete.message, life: 3000 });
            }
            else {
                toast.add({ severity: 'warn', summary: 'Sorry!', detail: subjectDelete.message, life: 3000 });
            }
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
}





/**
 * ?Update related Methods
*/

// show edit class modal
const editSubject = (data) => {
    console.log(data);
    updateSubject_Show.value = true;
    updateSubject_SubjectId.value = data._id;
    updateSubject_SelectedClass.value = data.class;
    updateSubject_SubjectName.value = data.name;
}

// close update class modal
const closeUpdateModal = () => {
    updateSubject_Show.value = false;
}

// Handle update form submission
const updateFormSubmitHandler = async () => {

    console.log("updateFormSubmitHandler")

    updateSubject_ClassNameError.value = updateSubject_SelectedClass.value.length > 0 ? "" : "Class Name Required";
    updateSubject_SubjectNameError.value = updateSubject_SubjectName.value.length > 0 ? "" : "Subject Name Required";

    if (!updateSubject_SubjectNameError.value && !updateSubject_ClassNameError.value) {
        const subjectData = {
            className: updateSubject_SelectedClass.value,
            subjectName: updateSubject_SubjectName.value
        };

        console.log(subjectData);

        const subjectAdd = await fetchData.post('academic/subject', subjectData);

        if (subjectAdd.status === 'fail') {
            toast.add({ severity: 'error', summary: 'Error!', detail: subjectAdd.message, life: 3000 });
        }
        else if (subjectAdd.status === 'success') {
            // delete previous data
            const prevSubjectData = {
                subjectId: updateSubject_SubjectId.value
            }

            const deleteClass = await fetchData.delete('academic/subject', prevSubjectData);

            if (deleteClass.status === 'success') {
                toast.add({ severity: 'info', summary: 'Success!', detail: subjectAdd.message, life: 3000 });
                fetchAllsubject();
                updateSubject_Show.value = false;
            }
            else {
                updateFormSubmitHandler();
            }
        } else {
            toast.add({ severity: 'warn', summary: 'Sorry!', detail: subjectAdd.message, life: 3000 });
        }
    } else {
        console.log("update error")
    }
}

onMounted(() => {
    fetchAllClass();
    fetchAllsubject();
})

</script>

<style lang="scss" scoped>
</style>