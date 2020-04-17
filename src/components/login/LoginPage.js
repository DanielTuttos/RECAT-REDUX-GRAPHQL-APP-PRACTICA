import React from 'react';
import styles from './login.module.css';
import { connect } from 'react-redux';
import { doGoogleLoginAction, logOutAction } from '../../redux/userDuck';

function LoginPage({ displayName, fetching, loggedIn, doGoogleLoginAction, logOutAction }) {

    const logInGoogle = () => {
        doGoogleLoginAction();
    }

    const logOutGoogle = () => {
        logOutAction();
    }

    if (fetching) return <h2>Cargando...</h2>

    return (
        <div className={styles.container}>
            {loggedIn ? <h1>
                Cierra tu sesión {displayName}
            </h1> : <h1>
                    Inicia Sesión con Google
            </h1>}


            {loggedIn ?
                <button
                    onClick={logOutGoogle}
                >
                    Cerrar Sesión
            </button> :
                <button
                    onClick={logInGoogle}
                >
                    Iniciar
            </button>}


        </div>
    )
}

function mapState({ user: { fetching, loggedIn, displayName } }) {
    return {
        fetching,
        loggedIn,
        displayName
    }
}

export default connect(mapState, { doGoogleLoginAction, logOutAction })(LoginPage)