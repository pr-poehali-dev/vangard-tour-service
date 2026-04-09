import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка сообщения с формы сайта на почту order.vanguard@mail.ru"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '').strip()
    contact = body.get('contact', '').strip()
    message = body.get('message', '').strip()
    client_email = body.get('client_email', '').strip()

    if not name or not contact:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Заполните имя и контакт'}, ensure_ascii=False)
        }

    smtp_user = 'order.vanguard@mail.ru'
    smtp_password = os.environ['SMTP_PASSWORD']

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(smtp_user, smtp_password)

        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'Новая заявка с сайта — {name}'
        msg['From'] = smtp_user
        msg['To'] = smtp_user
        html = f"""
        <h2>Новая заявка с сайта Ван Гард</h2>
        <p><b>Имя:</b> {name}</p>
        <p><b>Контакт:</b> {contact}</p>
        <p><b>Сообщение:</b> {message or 'не указано'}</p>
        """
        msg.attach(MIMEText(html, 'html'))
        server.sendmail(smtp_user, smtp_user, msg.as_string())

        if client_email:
            reply = MIMEMultipart('alternative')
            reply['Subject'] = 'Ван Гард — мы получили ваше обращение'
            reply['From'] = smtp_user
            reply['To'] = client_email
            reply_html = f"""
            <p>Здравствуйте, {name}!</p>
            <p>Спасибо за Ваше обращение в компанию Ван Гард, в ближайшее время мы свяжемся с Вами!</p>
            <br>
            <p style="color:#888">— Команда Ван Гард, Сочи</p>
            """
            reply.attach(MIMEText(reply_html, 'html'))
            server.sendmail(smtp_user, client_email, reply.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True})
    }