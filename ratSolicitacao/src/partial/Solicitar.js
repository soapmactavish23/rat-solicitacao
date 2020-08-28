import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    ImageBackground,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Picker
} from 'react-native'
import Bg from '../img/background.png'
import Bootstrap from '../lib/Bootstrap'
import { TextInputMask } from 'react-native-masked-text'
import axios from 'axios'
import { url, showError, showSuccess } from '../api/api'
// import Picker from '@react-native-community/picker'

var setores

export default class Solicitar extends Component {

    state = {
        solicitante: '',
        setor: '',
        email: '',
        contato: '',
        solicitacao: '',
        setor: '',
        ...setores,
        totSetores: ''
    }

    async componentDidMount() {
        try {
            const res = await axios.get(url + '/obtemSetores.php')
            this.setState({ setores: res.data.data })
            this.setState({ totSetores: res.data.data.length })

        } catch (e) {
            showError("Mensagem" + e)
        }
    }

    solicitar = async () => {
        try {
            const res = await axios.post(
                url + '/solicitaAtendimento.php?'
                + 'solicitante=' + this.state.solicitante
                + '&setor=' + this.state.setor
                + '&email=' + this.state.email
                + '&contato=' + this.state.contato
                + '&solicitacao=' + this.state.solicitacao
            )
            
            showSuccess("Solicitação enviada com sucesso! Protocolo de atendimento N° "+ res.data)
        } catch (e) {
            showError("Não foi possível fazer a solitação")
            console.log(e)
        }
    }

    recuperarSetores = () => {
        var setor = []
        for(var i = 0; i < this.state.totSetores; i++){
            setor.push(this.state.setores[i])
        }
        return setor.map(element => {
            return(
                <Picker.Item key={element.setor} label={element.setor} value={element.setor}></Picker.Item>
            )
        })
    }

    render() {
        const validations = []
        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.solicitante)
        validations.push(this.state.contato)
        validations.push(this.state.solicitacao)

        const validForm = validations.reduce((t, a) => t && a)

        return (
            <ImageBackground source={Bg} style={styles.bg} >
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={Bootstrap.styles.h1}>Solicitação de atendimento técnico</Text>
                        <View style={{ borderBottomColor: 'black', borderBottomWidth: 0.5, }} />
                        <View style={Bootstrap.styles.container}>
                            <Text style={Bootstrap.styles.lead, { margin: 10 }}>
                                Para solicitar um atendimento técnico de informática ou telecomunicação à DITEL, é necessário que preencha o formulário abaixo.
                        </Text>
                        </View>
                        <View style={{ borderBottomColor: 'black', borderBottomWidth: 0.5, }} />
                        <View style={Bootstrap.styles.container}>
                            <Text style={Bootstrap.styles.h5}>Solicitante:</Text>
                            <TextInput key="nome" style={[Bootstrap.styles.formControl, Bootstrap.styles.h5]} placeholder="Digite seu nome" onChangeText={solicitante => this.setState({ solicitante })} />
                            <Text style={Bootstrap.styles.h5}>Setor: </Text>
                            <Picker onValueChange={setor => this.setState({setor})} selectedValue={this.state.setor} placeholder="Nenhum setor selecionado">
                                {this.recuperarSetores()}
                            </Picker>
                            <Text style={Bootstrap.styles.h5}>E-mail: </Text>
                            <TextInput key="email" style={[Bootstrap.styles.formControl, Bootstrap.styles.h5]} placeholder="Digite seu E-mail" onChangeText={email => this.setState({ email })} />
                            <Text style={Bootstrap.styles.h5}>Contato: </Text>
                            <TextInputMask key="contato" type={'cel-phone'} options={{ maskType: 'BRL', withDDD: true, dddMask: '(99) 9' }} style={[Bootstrap.styles.formControl, Bootstrap.styles.h5]} placeholder="Digite seu Contato" onChangeText={contato => this.setState({ contato })} maxLength={15} value={this.state.contato} />
                            <Text style={Bootstrap.styles.h5}>Solicitação: </Text>
                            <TextInput key="solicitacao" style={[Bootstrap.styles.h5, Bootstrap.styles.formControl]} multiline onChangeText={solicitacao => this.setState({ solicitacao })} placeholder="Descreva a solicitação" />
                        </View>
                        <TouchableOpacity onPress={this.solicitar} disabled={!validForm}>
                            <View style={[Bootstrap.styles.btnSuccess, Bootstrap.styles.btn, validForm ? {} : { backgroundColor: '#AAA' }]}>
                                <Text style={[Bootstrap.styles.textCenter, Bootstrap.styles.textLight, { fontSize: 20 }]}>
                                    Solicitar
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        resizeMode: "cover",
    },
    container: {
        backgroundColor: 'rgba(255,255,255, 0.85)',
        margin: 20,
        padding: 10
    },
})