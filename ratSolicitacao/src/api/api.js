import {Alert} from 'react-native'

const url = 'http://sistemas.segup.pa.gov.br/rat/api'

function showError(err) {
    Alert.alert('Erro', 'Mensagem: ' + err)
}

function showSuccess(msg) {
    Alert.alert('Sucesso', msg)
}

export {url, showError, showSuccess}