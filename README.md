# MUSLIMS CEMETERIES API

### To fetch lists of all muslims cemeteres make a get request to /cemeteries

## Added to this api are endpoints to fetch list of all countries,states in each country and city of each state in a country

@route get /countries
@desc fetch all countries

@route get /countries/states/:country_id
@desc fetch all states in a country

@route get /countries/cities/:state_id
@desc fetch all cities in a state
