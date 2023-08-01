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
@app.route('/',methods=["GET","POST"])
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
        cursor = conn.cursor()
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
        cursor.close()
        return resp
    except Exception as e:
        print("Something went wrong when processing the data:", str(e))
        traceback.print_exc()
        # In case of an error, return a response tuple with status 500
        response = jsonify({"error": "Something went wrong"})
        return response, 500
    

    
    

@app.route('/items',methods=["GET","DELETE","PUT"])
def items():
    try:
        if request.method == 'GET':    
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

        elif request.method == 'DELETE':
                data = request.json
                conn = mysql.connect()
                cursor =conn.cursor()
                item = data.get('item')
                cursor = conn.cursor()
                cursor.execute("DELETE from items where item=%s ", (item))
                conn.commit()
                cursor.close()

                response = jsonify({"message": "Item Deleted from cart successfully"})
                return response, 200  
        elif request.method == 'PUT':
                data = request.json
                print(data)
                conn = mysql.connect()
                cursor =conn.cursor()
                # item = data.get('item')
                # description = data.get('description')
                # price = data.get('price')
                # quantity = data.get('quantity')
                item = request.json.get('item')
                description = request.json.get('description')
                price = request.json.get('price')
                quantity = request.json.get('quantity')
                print("Data received:", data)
                print("Item:", item)
                print("Description:", description)
                print("Price:", price)
                print("Quantity:", quantity)

                cursor = conn.cursor()
                cursor.execute("update items set description=%s,price=%s,quantity=%s where item=%s ;", (description,price,quantity,item))
                conn.commit()
                cursor.close()

                response = jsonify({"message": "Item updated successfully"})
                return response, 200        
            
    except:
        print("Something went wrong when writing to the file")
        response = jsonify({"error": "Something went wrong"})
        return response, 500
    finally:
        cursor.close()

    return resp

@app.route('/additems',methods=["POST"])
def additems():
    try:
            data = request.json
            conn = mysql.connect()
            cursor =conn.cursor()
            print(data)
            item = data.get('item')
            description = data.get('description')
            price = data.get('price')
            quantity = data.get('quantity')
            category = data.get('category')
            imagelocation = data.get('imagelocation')
            createdDate = data.get('createdDate')
            updatedDate = data.get('updatedDate')
            addedBy = data.get('addedBy')
            cursor.execute("insert into items(item, description, price, quantity, category, imglocation, createdDate, updatedDate, addedBy) values (%s, %s, %s, %s, %s, %s, %s, %s, %s)", (item, description, price, quantity, category, imagelocation, createdDate, updatedDate, addedBy))
            conn.commit()
            resp = jsonify({"message": "Item Added to cart successfully"})
            return resp
    except Exception as e:
        print("Error when processing the data:", str(e))
        traceback.print_exc()
        response = jsonify({"error": "Something went wrong"})
        return response, 500
    finally:
        cursor.close()

    
            
        
        

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
        # Check if the item is already in the cart for the given username
            cursor.execute("SELECT id, quantity FROM cart WHERE item = %s AND username = %s", (item, username))
            existing_item = cursor.fetchone()

            if existing_item:
            # If the item exists, update the quantity
                new_quantity = existing_item[1] + int(quantity)
                cursor.execute("UPDATE cart SET quantity = %s WHERE id = %s", (new_quantity, existing_item[0]))
            else:
            # If the item doesn't exist, insert a new row
                cursor.execute("INSERT INTO cart (item, quantity, price, username) VALUES (%s, %s, %s, %s)", (item, quantity, price, username))

            conn.commit()
            response = jsonify({"message": "Item added to cart successfully"})
            return response, 200
        
        elif request.method == 'DELETE':
            data = request.json
            conn = mysql.connect()
            cursor =conn.cursor()
            item = data.get('item')
            username=data.get('username')
            cursor = conn.cursor()
            cursor.execute("DELETE from cart where item=%s and username=%s", (item,username))
            conn.commit()
            cursor.close()

            response = jsonify({"message": "Item Deleted from cart successfully"})
            return response, 200

        else:
            conn = mysql.connect()
            cursor =conn.cursor()
            cursor.execute("SELECT * FROM cart")
        rows = cursor.fetchall()

        # Create a list to hold the response data for all users
        response_data = []
        current_user_data = None
        current_username = None

        # Convert the fetched data into a list of dictionaries
        for row in rows:
            username = row[4]
            cart_dict = {
                'id': row[0],
                'item': row[1],
                'quantity': row[2],
                'price': row[3],
                # Add other attributes from the database as needed
            }

            # If the username changes, create a new user entry in the response data list
            if username != current_username:
                current_username = username
                current_user_data = {
                    'username': username,
                    'data': []
                }
                response_data.append(current_user_data)

            current_user_data['data'].append(cart_dict)

        # jsonify the list of user data
        resp = jsonify(response_data)
        return resp, 200


       
    except Exception as e:
        print("Something went wrong when processing the data:", str(e))
        traceback.print_exc()
        # In case of an error, return a response tuple with status 400
        response = jsonify({"error": "Something went wrong"})
        return response, 400

    


if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000", debug=True)