const { districts, divisions } = require("./dataProvider");


const districtsByDivision = (divisionName) => {
    const division_id = divisions.filter((division) => {
        return divisionName === division.name;
    })[0].id;

    return districts.filter((district) => {
        return division_id === district.division_id;
    });
}


module.exports = { districtsByDivision };