export const colors = {
    primary: '#3498db',
    primaryHover: '#2980b9',
    secondary: '#2c3e50',
    success: '#27ae60',
    danger: '#e74c3c',
    warning: '#f39c12',
    purple: '#9b59b6',
    text: '#555',
    white: '#ffffff',
    background: '#f8f9fa'
};

export const commonStyles = {
    container: {
        padding: '40px',
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center'
    },
    title: {
        fontSize: '2.5rem',
        marginBottom: '20px',
        fontWeight: 'bold'
    },
    text: {
        color: colors.text,
        fontSize: '1.2rem',
        lineHeight: '1.6'
    },
    button: {
        padding: '12px 30px',
        fontSize: '16px',
        backgroundColor: colors.primary,
        color: colors.white,
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        fontWeight: '500'
    },
    link: {
        display: 'inline-block',
        padding: '12px 30px',
        backgroundColor: colors.primary,
        color: colors.white,
        textDecoration: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        fontWeight: '500',
        transition: 'background-color 0.3s'
    },
    card: {
        padding: '40px',
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
        backgroundColor: colors.background,
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    badge: {
        display: 'inline-block',
        padding: '8px 16px',
        borderRadius: '5px',
        fontWeight: 'bold',
        marginLeft: '10px'
    }
};

export const navStyles = {
    nav: {
        padding: '20px',
        backgroundColor: colors.secondary,
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    link: {
        color: colors.white,
        marginRight: '20px',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: '500',
        transition: 'color 0.3s'
    }
};