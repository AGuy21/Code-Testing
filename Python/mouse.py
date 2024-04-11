import pyautogui
from pynput import keyboard

# Free to change variables below
keyToStart = "o"
resolution = (1920, 1080) # Only change this if you have diffrent resolution
center = (resolution[0]//2, resolution[1]//2) # dont change this

# Do Not Dare to Change Below
print(f"Press {keyToStart} to start")


def mouse():
    print("Press 'Ctrl + C' to stop")
    try:
        pyautogui.click(center[0] -25, center[1])
        pyautogui.moveTo(50, 500)
        pyautogui.dragTo(100, 500,)o
    except KeyboardInterrupt:
        print('\n Stopped.')

# This function will listen to the key pressed and act accordingly
def on_press(key):
    # This will make a variable with the necessary key to start the programo
    try:
        k = key.char  # single-char keys
    except:
        k = key.name  # other keys

    # This will check if start or stop to print the key pressed or to start/stop the program
    if k == keyToStart:  
        print('Starting...' )
        mouse()
        return False  # stop listener
    else:
        print(f"Key pressed: {k}")

# Key listener setup
listener = keyboard.Listener(on_press=on_press)
listener.start()  # start to listen on a separate thread
listener.join()
