const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }

    return (
        <div style={footerStyle}>
            <br />
            <em>Practice <a href='https://fullstackopen.com/'> bootcamp</a></em>
        </div>
    )
}

export default Footer