# Oliver Rayner
# October 2022

# HackMIT 2022 Calendar thingy

from ics import Calendar, Event

with open('calendar.ics', 'r') as f :
    text = f.readlines()