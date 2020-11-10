# -*- coding: utf-8 -*-
from datetime import datetime


def datetime_to_readable(shot_time):
    fr_day = {
        0: "Dimanche",
        1: "Lundi",
        2: "Mardi",
        3: "Mercredi",
        4: "Jeudi",
        5: "Vendredi",
        6: "Samedi"
    }

    fr_months = {
        1: "Janvier",
        2: "Février",
        3: "Mars",
        4: "Avril",
        5: "Mai",
        6: "Juin",
        7: "Juillet",
        8: "Août",
        9: "Septembre",
        10: "Octobre",
        11: "Novembre",
        12: "Décembre"
    }

    fr_day = fr_day[int(shot_time.strftime("%w"))]
    day = shot_time.strftime("%d")
    fr_month = fr_months[int(shot_time.strftime("%m"))]
    year = shot_time.strftime("%Y")

    return "{} {} {} {}".format(fr_day, day, fr_month, year)


def extract_hour(shot_time):
    return shot_time.strftime("%Hh%M")


def arrange_crenaux(list_of_creneaux):

    crenaux = [(
            datetime_to_readable(shot.creneau),
            [shot.id, extract_hour(shot.creneau)]
        ) for shot in list_of_creneaux
    ]

    dico = {}
    for creneau in crenaux:
        if creneau[0] not in dico.keys():
            dico[creneau[0]] = [creneau[1]]
        else:
            dico[creneau[0]].append(creneau[1])


    distincts_crn = [cr[0] for cr in crenaux]
    ctx = []

    for i in distincts_crn:
        if i not in ctx:
            ctx.append(i)

    ctx = [{"date": ct, "times": dico[ct]} for ct in ctx]

    return ctx
