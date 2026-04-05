import tensorflow as tf
import numpy as np

base_model = tf.keras.applications.MobileNetV2(
    weights="imagenet",
    include_top=False,
    input_shape=(224, 224, 3)
)

x = base_model.output
x = tf.keras.layers.GlobalAveragePooling2D()(x)
x = tf.keras.layers.Dense(1, activation='sigmoid')(x)

model = tf.keras.models.load_model("model.h5")

for layer in base_model.layers:
    layer.trainable = False


def preprocess(image):
    image = image.resize((224, 224))
    img = np.array(image) / 255.0
    return np.expand_dims(img, axis=0)


def predict_image(image):
    img = preprocess(image)
    pred = model.predict(img)[0][0]

    return {
        "label": "FAKE" if pred > 0.5 else "REAL",
        "confidence": float(pred)
    }