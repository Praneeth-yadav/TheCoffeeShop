import re
import datetime
from flask import Flask, render_template, request,jsonify
from flaskext.mysql import MySQL
import traceback
from flask_cors import CORS, cross_origin

app=Flask(__name__)
CORS(app)
mysql = MySQL(autocommit=True)
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'Smallworld@9286'
app.config['MYSQL_DATABASE_DB'] = 'coffee'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['MYSQL_PORT'] = '3306'
mysql.init_app(app)
x = datetime.datetime.now()
count=0
@app.route('/',methods=["GET"])
def get_time():
    # Returning an api for showing in  reactjs
    return {
        'Name':"geek",
        "Age":"22",
        "Date":x,
        "programming":"python"
        }
 
@app.route('/login',methods=["GET"])
def login():
    try:
        conn = mysql.connect()
        cursor =conn.cursor()
        cursor.execute("SELECT * FROM usercredentials")
        rows = cursor.fetchall()

        # Convert the fetched data into a list of dictionaries
        user_list = []
        for row in rows:
            user_dict = {
                'id': row[0],
                'username': row[1],
                'password': row[2],
                'email': row[3],
                # Add other attributes from the database as needed
            }
            user_list.append(user_dict)

        # jsonify the list of dictionaries
        resp = jsonify(user_list)
        
    except:
        print("Something went wrong when writing to the file")
    finally:
        cursor.close()

    
    return resp

@app.route('/items',methods=["GET"])
def items():
    try:
        conn = mysql.connect()
        cursor =conn.cursor()
        cursor.execute("SELECT * FROM items")
        rows = cursor.fetchall()

        # Convert the fetched data into a list of dictionaries
        item_list = []
        for row in rows:
            item_dict = {
                'id': row[0],
                'item': row[1],
                'description': row[2],
                'imglocation': row[3],
                'category': row[4],
                'quantity': row[5],
                'price': row[6],
                'createdDate': row[7],
                'updatedDate': row[8],
                'addedBy': row[9],
                # Add other attributes from the database as needed
            }
            item_list.append(item_dict)

        # jsonify the list of dictionaries
        resp = jsonify(item_list)
        
    except:
        print("Something went wrong when writing to the file")
    finally:
        cursor.close()

    
    return resp


@app.route('/cart',methods=["POST","GET","DELETE"])
def cart():
    try:
        
        if request.method == 'POST':
            data = request.json
            conn = mysql.connect()
            cursor =conn.cursor()
            item = data.get('item')
            quantity = data.get('quantity')
            price = data.get('price')
            username=data.get('username')
            cursor = conn.cursor()
            cursor.execute("INSERT INTO cart (item, quantity, price,username) VALUES (%s, %s, %s, %s)", (item, quantity, price,username))
            cursor.close()

            response = jsonify({"message": "Item added to cart successfully"})
            return response, 200
        #todo
        elif request.method == 'DELETE':
            data = request.json
            conn = mysql.connect()
            cursor =conn.cursor()
            item = data.get('item')
            username=data.get('username')
            cursor = conn.cursor()
            cursor.execute("DELETE from cart where item=%s and username=%s", (item,username))
            cursor.close()

            response = jsonify({"message": "Item Deleted from cart successfully"})
            return response, 200

        else:
            conn = mysql.connect()
            cursor =conn.cursor()
            cursor.execute("SELECT * FROM cart")
            rows = cursor.fetchall()

            # Convert the fetched data into a list of dictionaries
            cart_list = []
            for row in rows:
                cart_dict = {
                   'id': row[0],
                   'item': row[1],
                   'quantity': row[2],
                   'price': row[3],
                   'username': row[4],
                    # Add other attributes from the database as needed
                }
                cart_list.append(cart_dict)

            # jsonify the list of dictionaries
            resp = jsonify(cart_list)
            return resp, 200


       
    except Exception as e:
        print("Something went wrong when processing the data:", str(e))
        traceback.print_exc()
        # In case of an error, return a response tuple with status 400
        response = jsonify({"error": "Something went wrong"})
        return response, 400

    
    return ()


if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000", debug=True)