import express from 'express';


const app =  express();

//create my data
const data = [
    {id: 1, language: 'JavaScript'},
    {id: 2, language: 'Java'},
    {id: 3, language: 'Python'},

]

app.use(express.json())

//get all my data
app.get('/', (req, res) => {
    res.status(200).json(data)
})


//get one data
app.get('/:id', (req, res) => {
    const { id } = req.params
    const one = data.find(el => el.id === +id)
    if(!one) return res.status(404).json({message: 'Not Found'})
    res.status(200).json(one)
})


//post new data: Recupérer les données qui vont être envoyés par le client
app.post('/', (req, res) => {
    const { body } = req
    const newOne = {
        id: data.length + 1,
        ...body
    }
    data.push(newOne)
    res.status(201).json(newOne)
})



//update my data
app.put('/:id', (req, res) => {
    const { id } = req.params
    const { body } = req
    const one = data.find(el => el.id === +id)
    if(!one) return res.status(404).json({message: 'Not Found'}) 
    one.language = body.language
    res.status(200).json(one)
})



//delete my data
app.delete('/:id', (req, res) => {
    const { id } = req.params
    const one = data.find(el => el.id === +id)
    if(!one) return res.status(404).json({ message: 'Not found'})
    data.splice(data.indexOf(+id), 1)
    res.status(200).json({ message: 'Ressource supprimée'})
})




app.listen('8082', () => console.log('port 8082'))

